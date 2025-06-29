export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      account_sizes: {
        Row: {
          account_size: string
          created_at: string | null
          discount: number | null
          firm_id: string | null
          id: string
          payout_rate: number | null
          platform: string | null
          price: number | null
          updated_at: string | null
        }
        Insert: {
          account_size: string
          created_at?: string | null
          discount?: number | null
          firm_id?: string | null
          id?: string
          payout_rate?: number | null
          platform?: string | null
          price?: number | null
          updated_at?: string | null
        }
        Update: {
          account_size?: string
          created_at?: string | null
          discount?: number | null
          firm_id?: string | null
          id?: string
          payout_rate?: number | null
          platform?: string | null
          price?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "account_sizes_firm_id_fkey"
            columns: ["firm_id"]
            isOneToOne: false
            referencedRelation: "propfirms"
            referencedColumns: ["id"]
          },
        ]
      }
      cheap_firms: {
        Row: {
          created_at: string
          firm_id: string
          id: string
        }
        Insert: {
          created_at?: string
          firm_id: string
          id?: string
        }
        Update: {
          created_at?: string
          firm_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cheap_firms_firm_id_fkey"
            columns: ["firm_id"]
            isOneToOne: true
            referencedRelation: "propfirms"
            referencedColumns: ["id"]
          },
        ]
      }
      propfirms: {
        Row: {
          cons: string[] | null
          coupon_code: string | null
          created_at: string | null
          description: string | null
          discount: number | null
          features: string[] | null
          id: string
          logo_url: string | null
          max_funding: number | null
          name: string
          original_price: number | null
          payout_rate: number | null
          platform: string | null
          price: number | null
          profit_split: number | null
          pros: string[] | null
          regulation_country: string | null
          review_score: number | null
          tags: string[] | null
          trading_levels: string[] | null
          trust_rating: number | null
          updated_at: string | null
        }
        Insert: {
          cons?: string[] | null
          coupon_code?: string | null
          created_at?: string | null
          description?: string | null
          discount?: number | null
          features?: string[] | null
          id?: string
          logo_url?: string | null
          max_funding?: number | null
          name: string
          original_price?: number | null
          payout_rate?: number | null
          platform?: string | null
          price?: number | null
          profit_split?: number | null
          pros?: string[] | null
          regulation_country?: string | null
          review_score?: number | null
          tags?: string[] | null
          trading_levels?: string[] | null
          trust_rating?: number | null
          updated_at?: string | null
        }
        Update: {
          cons?: string[] | null
          coupon_code?: string | null
          created_at?: string | null
          description?: string | null
          discount?: number | null
          features?: string[] | null
          id?: string
          logo_url?: string | null
          max_funding?: number | null
          name?: string
          original_price?: number | null
          payout_rate?: number | null
          platform?: string | null
          price?: number | null
          profit_split?: number | null
          pros?: string[] | null
          regulation_country?: string | null
          review_score?: number | null
          tags?: string[] | null
          trading_levels?: string[] | null
          trust_rating?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          category: string | null
          created_at: string | null
          expert_score: number | null
          expert_summary: string | null
          firm_id: string | null
          id: string
          payout_speed: string | null
          trust_score: number | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          expert_score?: number | null
          expert_summary?: string | null
          firm_id?: string | null
          id?: string
          payout_speed?: string | null
          trust_score?: number | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          expert_score?: number | null
          expert_summary?: string | null
          firm_id?: string | null
          id?: string
          payout_speed?: string | null
          trust_score?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_firm_id_fkey"
            columns: ["firm_id"]
            isOneToOne: false
            referencedRelation: "propfirms"
            referencedColumns: ["id"]
          },
        ]
      }
      top_firms: {
        Row: {
          created_at: string
          firm_id: string
          id: string
          rank: number
        }
        Insert: {
          created_at?: string
          firm_id: string
          id?: string
          rank: number
        }
        Update: {
          created_at?: string
          firm_id?: string
          id?: string
          rank?: number
        }
        Relationships: [
          {
            foreignKeyName: "top_firms_firm_id_fkey"
            columns: ["firm_id"]
            isOneToOne: true
            referencedRelation: "propfirms"
            referencedColumns: ["id"]
          },
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
