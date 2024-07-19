import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="robots" content="index,follow" />
				<link rel="icon" type="image/png" href="/img/logo/helmet.png" />

				{/* SEO */}
				<meta name="keyword" content={'pureride, pureride.uz, motorcycle , motorace'} />
				<meta
					name={'description'}
					content={
						'Buy and sell products anywhere anytime in South Korea. Best Products at Best prices on PureRide.uz | ' +
						'Покупайте и продавайте недвижимость в любой точке Южной Кореи в любое время. Лучшая недвижимость по лучшим ценам на PureRide.uz | ' +
						'대한민국 언제 어디서나 부동산을 사고팔 수 있습니다. PureRide.uz에서 최적의 가격으로 최고의 부동산을 만나보세요'
					}
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
