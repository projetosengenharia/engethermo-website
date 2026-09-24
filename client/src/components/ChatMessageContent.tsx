import { Streamdown } from 'streamdown';

export default function ChatMessageContent({ content }: { content: string }) {
  return <Streamdown>{content}</Streamdown>;
}
