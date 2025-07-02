// Negeri (State) interface
export interface Negeri {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

// Kamus (Dictionary) interface
export interface Kamus {
  id: number;
  dialek: string;
  maksud: string;
  contoh_ayat: string;
  negeri_id: number;
  negeri?: Negeri;
  createdAt?: string;
  updatedAt?: string;
}

// Create and Update DTOs
export interface CreateKamusDto {
  dialek: string;
  maksud: string;
  contoh_ayat?: string;
  negeri_id: number;
}

export interface UpdateKamusDto {
  dialek?: string;
  maksud?: string;
  contoh_ayat?: string;
  negeri_id?: number;
}

export interface CreateNegeriDto {
  name: string;
}

export interface UpdateNegeriDto {
  name?: string;
}
