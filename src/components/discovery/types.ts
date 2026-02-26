export interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  isGenUI?: boolean;
  suggestedOptions?: string[];
  uiRequest?: {
    type: "none" | "context_input" | "multi_select" | "budget_timeline";
    options?: string[];
    isCompleted?: boolean;
  };
  groundingSources?: { uri: string; title: string }[];
}

export interface DiscoveryChatProps {
  isOpen: boolean;
  onClose: () => void;
  initialContext: {
    businessType: string;
    focusArea: string;
  };
  onBookCall: () => void;
}
