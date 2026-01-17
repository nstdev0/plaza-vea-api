// domain/value-objects/Price.ts

export class Price {
  // Usamos BigInt para seguridad matemática nativa sin librerías
  private readonly amount: bigint;
  private readonly currency: string;

  private constructor(amount: bigint, currency: string) {
    this.amount = amount;
    this.currency = currency;
  }

  // Factory Method para crear desde un número flotante (lo que viene del API/Frontend)
  // Ej: Price.fromFloat(100.50) -> Guarda 10050
  public static fromFloat(amount: number, currency: string = "PEN"): Price {
    // Validamos seguridad
    if (isNaN(amount)) throw new Error("Price must be a number");

    // Convertimos a centavos y luego a BigInt
    // Math.round corrige pequeños errores de flotante antes de guardar
    const cents = BigInt(Math.round(amount * 100));
    return new Price(cents, currency);
  }

  // Factory Method para crear desde base de datos (si guardas enteros)
  public static fromCents(
    cents: number | bigint,
    currency: string = "PEN",
  ): Price {
    return new Price(BigInt(cents), currency);
  }

  // Operaciones de Dominio (Sin librerías externas)
  public add(other: Price): Price {
    if (this.currency !== other.currency) {
      throw new Error("Cannot add prices with different currencies");
    }
    return new Price(this.amount + other.amount, this.currency);
  }

  // Para devolver al exterior (DTOs)
  public toFloat(): number {
    // Convertimos BigInt a número y dividimos entre 100
    return Number(this.amount) / 100;
  }

  public toString(): string {
    return (Number(this.amount) / 100).toFixed(2);
  }

  public getAmount(): bigint {
    return this.amount;
  }
}
