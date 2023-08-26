export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      enabled_fonts: {
        Row: {
          createdAt: string
          fontId: string | null
          id: string
          updatedAt: string | null
        }
        Insert: {
          createdAt?: string
          fontId?: string | null
          id: string
          updatedAt?: string | null
        }
        Update: {
          createdAt?: string
          fontId?: string | null
          id?: string
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enabled_fonts_fontid_foreign"
            columns: ["fontId"]
            referencedRelation: "fonts"
            referencedColumns: ["id"]
          }
        ]
      }
      fonts: {
        Row: {
          category: string
          createdAt: string
          family: string
          fullName: string
          id: string
          postScriptName: string
          preview: string
          style: string
          updatedAt: string
          url: string
        }
        Insert: {
          category: string
          createdAt?: string
          family: string
          fullName: string
          id: string
          postScriptName: string
          preview: string
          style: string
          updatedAt?: string
          url: string
        }
        Update: {
          category?: string
          createdAt?: string
          family?: string
          fullName?: string
          id?: string
          postScriptName?: string
          preview?: string
          style?: string
          updatedAt?: string
          url?: string
        }
        Relationships: []
      }
      templates: {
        Row: {
          created_at: string | null
          id: number
          template: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          template?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: number
          template?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
