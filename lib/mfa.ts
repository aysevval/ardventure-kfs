import { authenticator } from "otplib"
import qrcode from "qrcode"

// TOTP sırrı oluştur
export function generateSecret(): string {
  return authenticator.generateSecret()
}

// TOTP token'ı oluştur
export function generateTOTP(secret: string): string {
  return authenticator.generate(secret)
}

// TOTP token'ını doğrula
export function verifyTOTP(token: string, secret: string): boolean {
  return authenticator.verify({ token, secret })
}

// QR kodu oluştur
export async function generateQRCode(secret: string, email: string): Promise<string> {
  const serviceName = "Ardventure KFS"
  const otpauth = authenticator.keyuri(email, serviceName, secret)
  return qrcode.toDataURL(otpauth)
}

// MFA durumunu kontrol et
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function checkMFAStatus(userId: string): Promise<boolean> {
  // Bu fonksiyon, veritabanından kullanıcının MFA durumunu kontrol etmelidir
  // Örnek implementasyon:
  // const user = await prisma.user.findUnique({ where: { id: userId } });
  // return user?.mfaEnabled ?? false;

  // Şimdilik her zaman false döndürüyoruz
  return false
}

// MFA'yı etkinleştir
export async function enableMFA(userId: string, secret: string): Promise<void> {
  // Bu fonksiyon, veritabanında kullanıcının MFA durumunu güncellemeli
  // ve şifrelenmiş MFA sırrını kaydetmelidir
  // Örnek implementasyon:
  // await prisma.user.update({
  //   where: { id: userId },
  //   data: { mfaEnabled: true, mfaSecret: encrypt(secret) },
  // });

  // Şimdilik sadece konsola yazdırıyoruz
  console.log(`MFA enabled for user ${userId} with secret ${secret}`)
}

// MFA'yı devre dışı bırak
export async function disableMFA(userId: string): Promise<void> {
  // Bu fonksiyon, veritabanında kullanıcının MFA durumunu güncellemeli
  // ve MFA sırrını silmelidir
  // Örnek implementasyon:
  // await prisma.user.update({
  //   where: { id: userId },
  //   data: { mfaEnabled: false, mfaSecret: null },
  // });

  // Şimdilik sadece konsola yazdırıyoruz
  console.log(`MFA disabled for user ${userId}`)
}

