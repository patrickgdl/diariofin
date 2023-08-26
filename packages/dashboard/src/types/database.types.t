export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
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
          template: Json | null
          uuid: string
        }
        Insert: {
          created_at?: string | null
          template?: Json | null
          uuid?: string
        }
        Update: {
          created_at?: string | null
          template?: Json | null
          uuid?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          billing_address: Json | null
          full_name: string | null
          id: string
          payment_method: Json | null
          role: string | null
        }
        Insert: {
          avatar_url?: string | null
          billing_address?: Json | null
          full_name?: string | null
          id: string
          payment_method?: Json | null
          role?: string | null
        }
        Update: {
          avatar_url?: string | null
          billing_address?: Json | null
          full_name?: string | null
          id?: string
          payment_method?: Json | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
