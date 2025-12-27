import { useEffect, useRef, useState, useCallback } from 'react';
import { getJwtToken } from '../auth';

interface UseWebSocketOptions {
	url: string;
	onMessage?: (data: any) => void;
	onError?: (error: Event) => void;
	autoReconnect?: boolean;
	reconnectInterval?: number;
}

interface UseWebSocketReturn {
	isConnected: boolean;
	sendMessage: (event: string, data?: any) => void;
	subscribe: (event: string) => void;
	unsubscribe: (event: string) => void;
	lastMessage: any;
}

export const useWebSocket = ({
	url,
	onMessage,
	onError,
	autoReconnect = true,
	reconnectInterval = 3000,
}: UseWebSocketOptions): UseWebSocketReturn => {
	const [isConnected, setIsConnected] = useState(false);
	const [lastMessage, setLastMessage] = useState<any>(null);
	const wsRef = useRef<WebSocket | null>(null);
	const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const shouldReconnectRef = useRef(true);

	const connect = useCallback(() => {
		try {
			const token = getJwtToken();
			const wsUrl = `${url}?token=${token}`;
			
			const ws = new WebSocket(wsUrl);
			wsRef.current = ws;

			ws.onopen = () => {
				console.log('WebSocket connected');
				setIsConnected(true);
			};

			ws.onmessage = (event) => {
				try {
					const data = JSON.parse(event.data);
					setLastMessage(data);
					if (onMessage) {
						onMessage(data);
					}
				} catch (error) {
					console.error('Error parsing WebSocket message:', error);
				}
			};

			ws.onerror = (error) => {
				console.error('WebSocket error:', error);
				if (onError) {
					onError(error);
				}
			};

			ws.onclose = () => {
				console.log('WebSocket disconnected');
				setIsConnected(false);
				wsRef.current = null;

				// Auto-reconnect if enabled
				if (autoReconnect && shouldReconnectRef.current) {
					reconnectTimeoutRef.current = setTimeout(() => {
						console.log('Attempting to reconnect...');
						connect();
					}, reconnectInterval);
				}
			};
		} catch (error) {
			console.error('Error creating WebSocket connection:', error);
		}
	}, [url, onMessage, onError, autoReconnect, reconnectInterval]);

	const sendMessage = useCallback((event: string, data?: any) => {
		if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
			const message = JSON.stringify({ event, ...data });
			wsRef.current.send(message);
		} else {
			console.warn('WebSocket is not connected');
		}
	}, []);

	const subscribe = useCallback((event: string) => {
		sendMessage(event);
	}, [sendMessage]);

	const unsubscribe = useCallback((event: string) => {
		sendMessage(event);
	}, [sendMessage]);

	useEffect(() => {
		shouldReconnectRef.current = true;
		connect();

		return () => {
			shouldReconnectRef.current = false;
			if (reconnectTimeoutRef.current) {
				clearTimeout(reconnectTimeoutRef.current);
			}
			if (wsRef.current) {
				wsRef.current.close();
			}
		};
	}, [connect]);

	return {
		isConnected,
		sendMessage,
		subscribe,
		unsubscribe,
		lastMessage,
	};
};
