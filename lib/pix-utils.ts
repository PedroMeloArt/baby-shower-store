/**
 * Pix BR Code (EMV QR Code) Generator
 * Implements the Brazilian Pix payment standard for static QR codes
 */

export interface PixConfig {
  pixKey: string;
  amount: number;
  name: string;
  city: string;
  description?: string;
  txid: string;
}

/**
 * TLV (Tag-Length-Value) encoder
 * Formats: ID (2 digits) + Length (2 digits) + Value
 */
function tlv(id: string, value: string): string {
  const len = String(value.length).padStart(2, "0");
  return id + len + value;
}

/**
 * CRC-16/CCITT-FALSE checksum calculator
 * Polynomial: 0x1021, Initial value: 0xFFFF
 */
function crc16CCITT(str: string): string {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= (str.charCodeAt(i) << 8);
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
      crc &= 0xFFFF;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

/**
 * Sanitizes and normalizes strings to uppercase ASCII
 * Removes diacritics and non-ASCII characters
 */
function sanitizeAscii(s: string, max: number): string {
  return s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\x20-\x7E]/g, "")
    .toUpperCase()
    .trim()
    .slice(0, max);
}

/**
 * Generates a unique transaction ID based on timestamp
 * Format: STORE + base36 timestamp (max 25 chars total)
 */
export function generateTxId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  return `STORE${timestamp}`.slice(0, 25);
}

/**
 * Builds a complete Pix BR Code payload
 * Returns the EMV QR code string with CRC checksum
 */
export function buildPixBRCode(config: PixConfig): string {
  const { pixKey, amount, name, city, description, txid } = config;

  // Normalize name and city to BR Code specifications
  const NAME = sanitizeAscii(name, 25);
  const CITY = sanitizeAscii(city, 15);

  // Build Merchant Account Information (tag 26) - Composite field
  const gui = tlv("00", "BR.GOV.BCB.PIX");
  const key = tlv("01", pixKey);
  const desc = description ? tlv("02", description.slice(0, 40)) : "";
  const merchantAccountInfo = tlv("26", gui + key + desc);

  // Build the complete payload without CRC
  const rootNoCrc =
    tlv("00", "01") +                                   // Payload Format Indicator
    tlv("01", "11") +                                   // Point of Initiation Method (static)
    merchantAccountInfo +                               // Merchant Account Info
    tlv("52", "0000") +                                 // Merchant Category Code
    tlv("53", "986") +                                  // Currency (BRL)
    tlv("54", amount.toFixed(2)) +                      // Transaction Amount
    tlv("58", "BR") +                                   // Country Code
    tlv("59", NAME) +                                   // Merchant Name
    tlv("60", CITY) +                                   // Merchant City
    tlv("62", tlv("05", txid)) +                        // Additional Data (TXID)
    "6304";                                             // CRC placeholder

  // Calculate CRC-16 and append
  const crc = crc16CCITT(rootNoCrc);
  return rootNoCrc + crc;
}

/**
 * Validates a Pix configuration object
 * Returns error message if invalid, null if valid
 */
export function validatePixConfig(config: Partial<PixConfig>): string | null {
  if (!config.pixKey || config.pixKey.trim().length === 0) {
    return "Chave Pix não configurada";
  }
  
  if (!config.amount || config.amount <= 0) {
    return "Valor inválido para pagamento";
  }
  
  if (!config.name || config.name.trim().length === 0) {
    return "Nome do comerciante não configurado";
  }
  
  if (!config.city || config.city.trim().length === 0) {
    return "Cidade não configurada";
  }
  
  if (!config.txid || config.txid.trim().length === 0) {
    return "ID da transação não gerado";
  }
  
  return null;
}

/**
 * Formats a number as Brazilian Real currency
 */
export function formatBRL(amount: number): string {
  return `R$ ${amount.toFixed(2).replace(".", ",")}`;
}
