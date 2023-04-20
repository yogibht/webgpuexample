interface ISSL {
	enabled: boolean;
	keyfile: string;
	certfile: string;
}

export interface IENV {
	isDev: boolean;
	SSL: ISSL;
	serviceport: number;
	clusterenabled?: boolean;
}

export const ENV: IENV = {
	isDev: true,
	SSL: {
		enabled: false,
		keyfile: "server.key",
		certfile: "server.cert"
	},
	serviceport: 3002
};
