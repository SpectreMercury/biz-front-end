import ReconnectingWebSocket from 'reconnecting-websocket';

// 定义可能从服务器接收的所有消息类型
interface AckMessage {
  type: 'ack';
  messageId: string;
}  
// 该类型代表可能从服务器接收的所有消息
type ServerMessage = AckMessage;

// 该类型代表可能发送到服务器的所有消息
interface OutgoingMessage {
  type: string;
  [key: string]: any;  // 为了通用性，允许任何其他键
}

class WebSocketClient {
  private socket: ReconnectingWebSocket;
  private readonly url: string;
  private readonly pendingAcks: Set<string> = new Set();

  constructor(url: string) {
    this.url = url;
    this.socket = this.createSocket();
  }

  private createSocket(): ReconnectingWebSocket {
    const rws = new ReconnectingWebSocket(this.url);

    rws.addEventListener('open', () => {
      console.log('WebSocket connected');
      this.pendingAcks.forEach((messageId) => {
        this.send(['retry', messageId ]);
      });
    });

    rws.addEventListener('message', (event:any) => {
      const data: ServerMessage = JSON.parse(event.data);
      if (data.type === 'ack') {
        this.pendingAcks.delete(data.messageId);  // 移除已确认的消息ID
      } else {
        // 处理其他消息类型，如有需要，您可以在这里扩展更多的消息类型
      }
    });

    rws.addEventListener('close', () => {
      console.log('WebSocket closed');
    });

    rws.addEventListener('error', (error: any) => {
      console.error('WebSocket Error:', error);
    });

    return rws;
  }

  public send(data: Array<any>): void {
    const messageId = this.generateMessageId();
    this.pendingAcks.add(messageId); // 添加消息ID到待确认集合中
    this.socket.send(JSON.stringify(data));
  }

  private generateMessageId(): string {
    return Math.random().toString(36).substr(2, 9);  // 生成随机的消息ID
  }

  public close(): void {
    this.socket.close();
  }
}

const wsClient = new WebSocketClient('wss://api.web3bd.network/relay');

export default wsClient;
