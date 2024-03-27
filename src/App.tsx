import { useState } from 'react';
import blueline from './assets/bluecurvedline.svg';

import './App.css';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const shortenUrl = async () => {
    try {
      const accessToken = 'c2d6b8bf95829571daf3c0096c5a5226ac86c87a';
      const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          long_url: longUrl,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setShortenedUrl(data.link);
        setError(null);
      } else {
        throw new Error('Failed to shorten URL. Please try again later.');
      }
    } catch (error) {
      console.error('Error shortening URL:', error);
      setShortenedUrl(null);
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to shorten URL. Please try again later.'
      );
    }
  };
  // const [menuOpen, setMenuOpen] = useState(false);

  // const toggleMenu = () => {
  //   setMenuOpen(!menuOpen);
  // };
  return (
    <>
      <main>
        {/* Header section */}
        <section id="header">
          <header>
            <div>
              <svg
                width="156"
                height="40"
                viewBox="0 0 156 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginLeft: '-120px' }}
              >
                <path
                  d="M31.6471 8.43938C31.0613 7.85354 30.1032 7.85354 29.5173 8.43938L26.4643 11.4948C25.2134 10.6627 23.7779 10.2497 22.3365 10.2497C20.4174 10.2497 18.4737 10.9822 17.0337 12.4469L12.5336 16.9472C9.96732 19.5106 9.65099 23.4747 11.5787 26.384L8.52587 29.4394C7.94003 30.0253 7.94003 30.9745 8.52587 31.5606C8.81891 31.8536 9.20267 32 9.58643 32C9.97044 32 10.354 31.8536 10.647 31.5606L13.6998 28.5051C14.9509 29.3372 16.395 29.7502 17.8365 29.7502C19.7306 29.7502 21.6743 29.0178 23.1393 27.553L27.6307 23.053C30.197 20.4893 30.5133 16.5252 28.5854 13.616L31.6471 10.5605C32.2329 9.97466 32.2329 9.02522 31.6471 8.43938ZM26.8276 17.75C26.8276 18.9512 26.3589 20.0821 25.5096 20.9317L21.0182 25.4317C20.1657 26.2813 19.013 26.75 17.8365 26.75C17.1568 26.75 16.5064 26.5832 15.9088 26.2988L18.1223 24.0605C18.7082 23.4747 18.7082 22.5255 18.1223 21.9394C17.5612 21.3536 16.612 21.3536 16.0261 21.9394L13.7879 24.1777C13.5009 23.5829 13.3367 22.9325 13.3367 22.25C13.3367 21.0488 13.8054 19.9179 14.655 19.0683L19.1301 14.5683C19.9797 13.7187 21.1353 13.25 22.3365 13.25C23.0162 13.25 23.6635 13.4168 24.2613 13.7012L21.9791 15.9862C21.3933 16.572 21.3933 17.5212 21.9791 18.1073C22.2722 18.4004 22.6557 18.5468 23.0397 18.5468C23.4206 18.5468 23.8043 18.4004 24.0971 18.1073L26.3767 15.8223C26.6635 16.4168 26.8276 17.0674 26.8276 17.75Z"
                  fill="#0065FE"
                />
                <path
                  d="M40.0865 8V32"
                  stroke="#0065FE"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M55.3825 27.336C53.7185 27.336 52.3185 26.968 51.1825 26.232C50.0465 25.48 49.2465 24.464 48.7825 23.184L51.6145 21.528C52.2705 23.24 53.5585 24.096 55.4785 24.096C56.4065 24.096 57.0865 23.928 57.5185 23.592C57.9505 23.256 58.1665 22.832 58.1665 22.32C58.1665 21.728 57.9025 21.272 57.3745 20.952C56.8465 20.616 55.9025 20.256 54.5425 19.872C53.7905 19.648 53.1505 19.424 52.6225 19.2C52.1105 18.976 51.5905 18.68 51.0625 18.312C50.5505 17.928 50.1585 17.448 49.8865 16.872C49.6145 16.296 49.4785 15.624 49.4785 14.856C49.4785 13.336 50.0145 12.128 51.0865 11.232C52.1745 10.32 53.4785 9.864 54.9985 9.864C56.3585 9.864 57.5505 10.2 58.5745 10.872C59.6145 11.528 60.4225 12.448 60.9985 13.632L58.2145 15.24C57.5425 13.8 56.4705 13.08 54.9985 13.08C54.3105 13.08 53.7665 13.24 53.3665 13.56C52.9825 13.864 52.7905 14.264 52.7905 14.76C52.7905 15.288 53.0065 15.72 53.4385 16.056C53.8865 16.376 54.7345 16.728 55.9825 17.112C56.4945 17.272 56.8785 17.4 57.1345 17.496C57.4065 17.576 57.7665 17.712 58.2145 17.904C58.6785 18.08 59.0305 18.248 59.2705 18.408C59.5265 18.568 59.8145 18.784 60.1345 19.056C60.4545 19.328 60.6945 19.608 60.8545 19.896C61.0305 20.184 61.1745 20.536 61.2865 20.952C61.4145 21.352 61.4785 21.792 61.4785 22.272C61.4785 23.824 60.9105 25.056 59.7745 25.968C58.6545 26.88 57.1905 27.336 55.3825 27.336ZM71.4895 27.336C68.9615 27.336 66.8735 26.496 65.2255 24.816C63.5775 23.136 62.7535 21.064 62.7535 18.6C62.7535 16.12 63.5775 14.048 65.2255 12.384C66.8735 10.704 68.9615 9.864 71.4895 9.864C73.0095 9.864 74.4095 10.224 75.6895 10.944C76.9855 11.648 77.9935 12.608 78.7135 13.824L75.8575 15.48C75.4415 14.728 74.8495 14.144 74.0815 13.728C73.3135 13.296 72.4495 13.08 71.4895 13.08C69.8575 13.08 68.5375 13.592 67.5295 14.616C66.5375 15.64 66.0415 16.968 66.0415 18.6C66.0415 20.216 66.5375 21.536 67.5295 22.56C68.5375 23.584 69.8575 24.096 71.4895 24.096C72.4495 24.096 73.3135 23.888 74.0815 23.472C74.8655 23.04 75.4575 22.456 75.8575 21.72L78.7135 23.376C77.9935 24.592 76.9935 25.56 75.7135 26.28C74.4335 26.984 73.0255 27.336 71.4895 27.336ZM80.748 10.2H84.06V27H80.748V10.2ZM92.6481 27.336C90.9841 27.336 89.5841 26.968 88.4481 26.232C87.3121 25.48 86.5121 24.464 86.0481 23.184L88.8801 21.528C89.5361 23.24 90.8241 24.096 92.7441 24.096C93.6721 24.096 94.3521 23.928 94.7841 23.592C95.2161 23.256 95.4321 22.832 95.4321 22.32C95.4321 21.728 95.1681 21.272 94.6401 20.952C94.1121 20.616 93.1681 20.256 91.8081 19.872C91.0561 19.648 90.4161 19.424 89.8881 19.2C89.3761 18.976 88.8561 18.68 88.3281 18.312C87.8161 17.928 87.4241 17.448 87.1521 16.872C86.8801 16.296 86.7441 15.624 86.7441 14.856C86.7441 13.336 87.2801 12.128 88.3521 11.232C89.4401 10.32 90.7441 9.864 92.2641 9.864C93.6241 9.864 94.8161 10.2 95.8401 10.872C96.8801 11.528 97.6881 12.448 98.2641 13.632L95.4801 15.24C94.8081 13.8 93.7361 13.08 92.2641 13.08C91.5761 13.08 91.0321 13.24 90.6321 13.56C90.2481 13.864 90.0561 14.264 90.0561 14.76C90.0561 15.288 90.2721 15.72 90.7041 16.056C91.1521 16.376 92.0001 16.728 93.2481 17.112C93.7601 17.272 94.1441 17.4 94.4001 17.496C94.6721 17.576 95.0321 17.712 95.4801 17.904C95.9441 18.08 96.2961 18.248 96.5361 18.408C96.7921 18.568 97.0801 18.784 97.4001 19.056C97.7201 19.328 97.9601 19.608 98.1201 19.896C98.2961 20.184 98.4401 20.536 98.5521 20.952C98.6801 21.352 98.7441 21.792 98.7441 22.272C98.7441 23.824 98.1761 25.056 97.0401 25.968C95.9201 26.88 94.4561 27.336 92.6481 27.336ZM106.125 27.336C104.461 27.336 103.061 26.968 101.925 26.232C100.789 25.48 99.9887 24.464 99.5247 23.184L102.357 21.528C103.013 23.24 104.301 24.096 106.221 24.096C107.149 24.096 107.829 23.928 108.261 23.592C108.693 23.256 108.909 22.832 108.909 22.32C108.909 21.728 108.645 21.272 108.117 20.952C107.589 20.616 106.645 20.256 105.285 19.872C104.533 19.648 103.893 19.424 103.365 19.2C102.853 18.976 102.333 18.68 101.805 18.312C101.293 17.928 100.901 17.448 100.629 16.872C100.357 16.296 100.221 15.624 100.221 14.856C100.221 13.336 100.757 12.128 101.829 11.232C102.917 10.32 104.221 9.864 105.741 9.864C107.101 9.864 108.293 10.2 109.317 10.872C110.357 11.528 111.165 12.448 111.741 13.632L108.957 15.24C108.285 13.8 107.213 13.08 105.741 13.08C105.053 13.08 104.509 13.24 104.109 13.56C103.725 13.864 103.533 14.264 103.533 14.76C103.533 15.288 103.749 15.72 104.181 16.056C104.629 16.376 105.477 16.728 106.725 17.112C107.237 17.272 107.621 17.4 107.877 17.496C108.149 17.576 108.509 17.712 108.957 17.904C109.421 18.08 109.773 18.248 110.013 18.408C110.269 18.568 110.557 18.784 110.877 19.056C111.197 19.328 111.437 19.608 111.597 19.896C111.773 20.184 111.917 20.536 112.029 20.952C112.157 21.352 112.221 21.792 112.221 22.272C112.221 23.824 111.653 25.056 110.517 25.968C109.397 26.88 107.933 27.336 106.125 27.336ZM128.4 24.816C126.704 26.496 124.64 27.336 122.208 27.336C119.776 27.336 117.712 26.496 116.016 24.816C114.336 23.12 113.496 21.048 113.496 18.6C113.496 16.152 114.336 14.088 116.016 12.408C117.712 10.712 119.776 9.864 122.208 9.864C124.64 9.864 126.704 10.712 128.4 12.408C130.096 14.088 130.944 16.152 130.944 18.6C130.944 21.048 130.096 23.12 128.4 24.816ZM118.344 22.56C119.384 23.584 120.672 24.096 122.208 24.096C123.744 24.096 125.032 23.584 126.072 22.56C127.112 21.52 127.632 20.2 127.632 18.6C127.632 17 127.112 15.68 126.072 14.64C125.032 13.6 123.744 13.08 122.208 13.08C120.672 13.08 119.384 13.6 118.344 14.64C117.304 15.68 116.784 17 116.784 18.6C116.784 20.2 117.304 21.52 118.344 22.56ZM142.487 27L139.103 21.168H136.583V27H133.271V10.2H139.991C141.543 10.2 142.863 10.744 143.951 11.832C145.039 12.92 145.583 14.232 145.583 15.768C145.583 16.808 145.287 17.776 144.695 18.672C144.103 19.552 143.319 20.216 142.343 20.664L146.063 27H142.487ZM136.583 13.296V18.264H139.991C140.615 18.264 141.151 18.024 141.599 17.544C142.047 17.048 142.271 16.456 142.271 15.768C142.271 15.08 142.047 14.496 141.599 14.016C141.151 13.536 140.615 13.296 139.991 13.296H136.583Z"
                  fill="#0065FE"
                />
              </svg>
            </div>
            <div>
              <nav>
                <a href="#myurls">My URls</a>
                <a href="/">My URLs</a>
                <a href="/">
                  Features{' '}
                  <img
                    src="./Assets/Images/Vector (5).png"
                    alt="dropdown image"
                  />
                </a>
                <a href="/">Analytics</a>
                <a href="/">FAQs</a>
                <a href="/">Pricing</a>
              </nav>
            </div>
            <div>
              <a href="/Login"> Log in</a>
              <a href="Signin">
                <button>Try for free</button>
              </a>
            </div>
          </header>
        </section>
        {/* URLs section */}
        <section id="myurls">
          <section>
            <div id="size">
              <div className="heading">
                <h1>
                  Optimize Your Online Experience with Our <br />
                  Advanced <span> URL Shortening</span> Solution
                </h1>
                <img src={blueline} alt="Blue curved line" />
              </div>
              <p>
                Personalize your shortened URLs to align with your brand
                identity. Utilize custom slugs, <br />
                branded links, and domain customization options to reinforce
                your brand presence and <br />
                enhance user engagement.
              </p>
              <button>Sign Up</button>
              <a href="">Learn more</a>
            </div>
          </section>
          <section>
            <div id="position">
              <div>
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M49.9999 23.3334L59.9999 23.3334C62.1886 23.3334 64.3559 23.7645 66.378 24.602C68.4001 25.4396 70.2374 26.6673 71.785 28.2149C73.3327 29.7626 74.5603 31.5999 75.3979 33.622C76.2355 35.6441 76.6666 37.8113 76.6666 40C76.6666 42.1887 76.2355 44.356 75.3979 46.3781C74.5603 48.4002 73.3327 50.2375 71.785 51.7852C70.2374 53.3328 68.4001 54.5605 66.378 55.398C64.3559 56.2356 62.1886 56.6667 59.9999 56.6667H49.9999M29.9999 56.6667H19.9999C17.8112 56.6667 15.644 56.2356 13.6219 55.398C11.5998 54.5605 9.76245 53.3328 8.21481 51.7852C5.0892 48.6595 3.33325 44.4203 3.33325 40C3.33325 35.5798 5.0892 31.3405 8.21481 28.2149C11.3404 25.0893 15.5796 23.3334 19.9999 23.3334H29.9999"
                    stroke="#141414"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M26.6667 40H53.3334"
                    stroke="#141414"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M49.9999 23.3334L59.9999 23.3334C62.1886 23.3334 64.3559 23.7645 66.378 24.602C68.4001 25.4396 70.2374 26.6673 71.785 28.2149C73.3327 29.7626 74.5603 31.5999 75.3979 33.622C76.2355 35.6441 76.6666 37.8113 76.6666 40C76.6666 42.1887 76.2355 44.356 75.3979 46.3781C74.5603 48.4002 73.3327 50.2375 71.785 51.7852C70.2374 53.3328 68.4001 54.5605 66.378 55.398C64.3559 56.2356 62.1886 56.6667 59.9999 56.6667H49.9999M29.9999 56.6667H19.9999C17.8112 56.6667 15.644 56.2356 13.6219 55.398C11.5998 54.5605 9.76245 53.3328 8.21481 51.7852C5.0892 48.6595 3.33325 44.4203 3.33325 40C3.33325 35.5798 5.0892 31.3405 8.21481 28.2149C11.3404 25.0893 15.5796 23.3334 19.9999 23.3334H29.9999"
                    stroke="#141414"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M26.6667 40H53.3334"
                    stroke="#141414"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: '24px' }}
                >
                  <path
                    d="M49.9999 23.3334L59.9999 23.3334C62.1886 23.3334 64.3559 23.7645 66.378 24.602C68.4001 25.4396 70.2374 26.6673 71.785 28.2149C73.3327 29.7626 74.5603 31.5999 75.3979 33.622C76.2355 35.6441 76.6666 37.8113 76.6666 40C76.6666 42.1887 76.2355 44.356 75.3979 46.3781C74.5603 48.4002 73.3327 50.2375 71.785 51.7852C70.2374 53.3328 68.4001 54.5605 66.378 55.398C64.3559 56.2356 62.1886 56.6667 59.9999 56.6667H49.9999M29.9999 56.6667H19.9999C17.8112 56.6667 15.644 56.2356 13.6219 55.398C11.5998 54.5605 9.76245 53.3328 8.21481 51.7852C5.0892 48.6595 3.33325 44.4203 3.33325 40C3.33325 35.5798 5.0892 31.3405 8.21481 28.2149C11.3404 25.0893 15.5796 23.3334 19.9999 23.3334H29.9999"
                    stroke="#141414"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M26.6667 40H53.3334"
                    stroke="#141414"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <svg
                  width="41"
                  height="12"
                  viewBox="0 0 41 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginBottom: '32px', marginRight: '24px' }}
                >
                  <path
                    d="M1 5C0.447715 5 0 5.44772 0 6C0 6.55228 0.447715 7 1 7L1 5ZM41 6L31 0.226497V11.7735L41 6ZM1 7L32 7V5L1 5L1 7Z"
                    fill="#005AE2"
                  />
                </svg>

                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M49.9999 23.3334L59.9999 23.3334C62.1886 23.3334 64.3559 23.7645 66.378 24.602C68.4001 25.4396 70.2374 26.6673 71.785 28.2149C73.3327 29.7626 74.5603 31.5999 75.3979 33.622C76.2355 35.6441 76.6666 37.8113 76.6666 40C76.6666 42.1887 76.2355 44.356 75.3979 46.3781C74.5603 48.4002 73.3327 50.2375 71.785 51.7852C70.2374 53.3328 68.4001 54.5605 66.378 55.398C64.3559 56.2356 62.1886 56.6667 59.9999 56.6667H49.9999M29.9999 56.6667H19.9999C17.8112 56.6667 15.644 56.2356 13.6219 55.398C11.5998 54.5605 9.76245 53.3328 8.21481 51.7852C5.0892 48.6595 3.33325 44.4203 3.33325 40C3.33325 35.5798 5.0892 31.3405 8.21481 28.2149C11.3404 25.0893 15.5796 23.3334 19.9999 23.3334H29.9999"
                    stroke="#141414"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M26.6667 40H53.3334"
                    stroke="#141414"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p>
                  Seamlessly transform your long URLs into
                  <strong> concise </strong> <br />
                  and <strong>shareable</strong> links with just few clicks.
                </p>
              </div>
            </div>
            <div id="circle">
              <span>This is a circle</span>
            </div>
          </section>
        </section>
        {/* Features section */}
        <section id="features">
          <section id="flex">
            <div>
              <h2>One Stop.</h2>
              <h2>
                Four <span style={{ color: '#005ae2' }}>Possibilities</span>.
              </h2>
            </div>
            <div id="flex2">
              <div>
                <p>
                  <span className="block">3M </span>Active users
                </p>
              </div>
              <div>
                <p>
                  <span className="block">60M </span>Links & QR <br />
                  codes created
                </p>
              </div>
              <div>
                <p>
                  <span className="block">1B </span>Clicked & Scanned <br />
                  connections
                </p>
              </div>
              <div>
                <p>
                  <span className="block">300k </span>App Integrations
                </p>
              </div>
            </div>
          </section>
          <section id="flexcontainer">
            <div>
              <div>
                <svg
                  width="6"
                  height="48"
                  viewBox="0 0 6 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 0V48"
                    stroke="url(#paint0_linear_1982_902)"
                    stroke-width="5"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1982_902"
                      x1="3.05"
                      y1="0"
                      x2="3.05"
                      y2="48"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#112232" />
                      <stop offset="1" stop-color="#4D6B88" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                <h2>
                  Why choose{' '}
                  <span style={{ color: '#005ae2', display: 'inline-block' }}>
                    Scissors
                  </span>
                </h2>
              </div>
              <p style={{ marginLeft: '32px' }}>
                Scissors is the hub of everything that has to do <br />
                with your link management. We shorten your URLs,
                <br />
                allow you creating custom ones for your personal, <br />
                business, event usage. Our swift QR code <br />
                creation, management and usage tracking with <br />
                advance analytics for all of these is second to <br />
                none.
              </p>
            </div>
            <div id="grid">
              <div>
                {/* wrapping images in span rather than using ellipse icon to be able to get the circle behind the images */}
                <svg
                  width="57"
                  height="56"
                  viewBox="0 0 57 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1982_908)">
                    <path
                      d="M31.1001 23H34.1001C34.7567 23 35.4069 23.1293 36.0135 23.3806C36.6201 23.6319 37.1713 24.0002 37.6356 24.4645C38.0999 24.9288 38.4682 25.48 38.7195 26.0866C38.9708 26.6932 39.1001 27.3434 39.1001 28C39.1001 28.6566 38.9708 29.3068 38.7195 29.9134C38.4682 30.52 38.0999 31.0712 37.6356 31.5355C37.1713 31.9998 36.6201 32.3681 36.0135 32.6194C35.4069 32.8707 34.7567 33 34.1001 33H31.1001M25.1001 33H22.1001C21.4435 33 20.7933 32.8707 20.1867 32.6194C19.5801 32.3681 19.0289 31.9998 18.5646 31.5355C17.6269 30.5979 17.1001 29.3261 17.1001 28C17.1001 26.6739 17.6269 25.4021 18.5646 24.4645C19.5022 23.5268 20.774 23 22.1001 23H25.1001"
                      stroke="#141414"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M24.1001 28H32.1001"
                      stroke="#005AE2"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <circle
                    cx="28.1001"
                    cy="28"
                    r="28"
                    fill="#3284FF"
                    fill-opacity="0.13"
                  />
                  <defs>
                    <clipPath id="clip0_1982_908">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(16.1001 16)"
                      />
                    </clipPath>
                  </defs>
                </svg>

                <h3>URL Shortening</h3>
                <p>
                  Scissor allows you to shorten URLs of your <br />
                  business, events. Shorten your URL at scale, <br />
                  URL redirects.
                </p>
              </div>
              <div>
                <svg
                  width="57"
                  height="56"
                  viewBox="0 0 57 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M27.1001 20H20.1001C19.5697 20 19.061 20.2107 18.6859 20.5858C18.3108 20.9609 18.1001 21.4696 18.1001 22V36C18.1001 36.5304 18.3108 37.0391 18.6859 37.4142C19.061 37.7893 19.5697 38 20.1001 38H34.1001C34.6305 38 35.1392 37.7893 35.5143 37.4142C35.8894 37.0391 36.1001 36.5304 36.1001 36V29"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M34.6001 18.5C34.9979 18.1022 35.5375 17.8787 36.1001 17.8787C36.6627 17.8787 37.2023 18.1022 37.6001 18.5C37.9979 18.8978 38.2214 19.4374 38.2214 20C38.2214 20.5626 37.9979 21.1022 37.6001 21.5L28.1001 31L24.1001 32L25.1001 28L34.6001 18.5Z"
                    stroke="#005AE2"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <circle
                    cx="28.1001"
                    cy="28"
                    r="28"
                    fill="#3284FF"
                    fill-opacity="0.13"
                  />
                </svg>

                <h3>Custom URLs</h3>
                <p>
                  With Scissor, you can create custom URLs, <br />
                  with the length you want! A solution for socials <br />
                  and businesses.
                </p>
              </div>
              <div>
                <svg
                  width="57"
                  height="56"
                  viewBox="0 0 57 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.886 19.0676H18.886V26.0676H25.886V19.0676Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M36.886 19.0676H29.886V26.0676H36.886V19.0676Z"
                    stroke="#005AE2"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M36.886 30.0676H29.886V37.0676H36.886V30.0676Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M25.886 30.0676H18.886V37.0676H25.886V30.0676Z"
                    stroke="#005AE2"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <circle
                    cx="28.1001"
                    cy="28"
                    r="28"
                    fill="#3284FF"
                    fill-opacity="0.13"
                  />
                </svg>

                <h3>QR Codes</h3>
                <p>
                  Generate QR codes to your business, events. <br />
                  Bring your audience and customers to your <br />
                  doorstep with this scan and go solution.
                </p>
              </div>
              <div>
                <svg
                  width="57"
                  height="56"
                  viewBox="0 0 57 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1982_940)">
                    <path
                      d="M37.1001 28H33.1001L30.1001 37L24.1001 19L21.1001 28H17.1001"
                      stroke="#0065FE"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <circle
                    cx="28.1001"
                    cy="28"
                    r="28"
                    fill="#3284FF"
                    fill-opacity="0.13"
                  />
                  <defs>
                    <clipPath id="clip0_1982_940">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(16.1001 16)"
                      />
                    </clipPath>
                  </defs>
                </svg>

                <h3>Data Analytics</h3>
                <p>
                  Receive data on the usage of either your <br />
                  shortened URL, custom URLs or generated QR <br />
                  codes. Embedded to monitor progress.
                </p>
              </div>
            </div>
          </section>
        </section>
        {/* Pricing section */}
        <section id="cost">
          <div>
            <svg
              width="6"
              height="48"
              viewBox="0 0 6 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 0V48"
                stroke="url(#paint0_linear_1982_1037)"
                stroke-width="5"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1982_1037"
                  x1="3.05"
                  y1="0"
                  x2="3.05"
                  y2="48"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#112232" />
                  <stop offset="1" stop-color="#4D6B88" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>

            <h2 style={{ fontSize: '40px', display: 'inline-block' }}>
              A{' '}
              <span style={{ color: 'rgba(0, 90, 226, 1)' }}>
                price perfect
              </span>{' '}
              for your needs.
            </h2>
            <p style={{ marginTop: '-24px' }}>
              From catering for your personal, business, event, socials needs,
              you can be <br />
              rest assured we have you in mind in our pricing.
            </p>
          </div>
          <div id="price">
            <div className="white">
              <h4>Basic</h4>
              <h2>Free</h2>
              <p>Free plan for all users</p>
              <ul>
                <li>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1982_957)">
                      <path
                        d="M14.6666 7.38674V8.00007C14.6658 9.43769 14.2003 10.8365 13.3395 11.988C12.4787 13.1394 11.2688 13.9817 9.89016 14.3893C8.51154 14.797 7.03809 14.748 5.68957 14.2498C4.34104 13.7516 3.18969 12.8308 2.40723 11.6248C1.62476 10.4188 1.25311 8.99212 1.3477 7.55762C1.44229 6.12312 1.99806 4.75762 2.93211 3.66479C3.86615 2.57195 5.12844 1.81033 6.53071 1.4935C7.93298 1.17668 9.4001 1.32163 10.7133 1.90674"
                        stroke="#005AE2"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.6667 2.66675L8 9.34008L6 7.34008"
                        stroke="#005AE2"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1982_957">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Unlimited URL Shortening
                </li>
                <li>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1982_957)">
                      <path
                        d="M14.6666 7.38674V8.00007C14.6658 9.43769 14.2003 10.8365 13.3395 11.988C12.4787 13.1394 11.2688 13.9817 9.89016 14.3893C8.51154 14.797 7.03809 14.748 5.68957 14.2498C4.34104 13.7516 3.18969 12.8308 2.40723 11.6248C1.62476 10.4188 1.25311 8.99212 1.3477 7.55762C1.44229 6.12312 1.99806 4.75762 2.93211 3.66479C3.86615 2.57195 5.12844 1.81033 6.53071 1.4935C7.93298 1.17668 9.4001 1.32163 10.7133 1.90674"
                        stroke="#005AE2"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.6667 2.66675L8 9.34008L6 7.34008"
                        stroke="#005AE2"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1982_957">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Basic Link Analytics
                </li>
                <li>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1982_957)">
                      <path
                        d="M14.6666 7.38674V8.00007C14.6658 9.43769 14.2003 10.8365 13.3395 11.988C12.4787 13.1394 11.2688 13.9817 9.89016 14.3893C8.51154 14.797 7.03809 14.748 5.68957 14.2498C4.34104 13.7516 3.18969 12.8308 2.40723 11.6248C1.62476 10.4188 1.25311 8.99212 1.3477 7.55762C1.44229 6.12312 1.99806 4.75762 2.93211 3.66479C3.86615 2.57195 5.12844 1.81033 6.53071 1.4935C7.93298 1.17668 9.4001 1.32163 10.7133 1.90674"
                        stroke="#005AE2"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.6667 2.66675L8 9.34008L6 7.34008"
                        stroke="#005AE2"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1982_957">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Customizable Short Links
                </li>
                <li>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1982_957)">
                      <path
                        d="M14.6666 7.38674V8.00007C14.6658 9.43769 14.2003 10.8365 13.3395 11.988C12.4787 13.1394 11.2688 13.9817 9.89016 14.3893C8.51154 14.797 7.03809 14.748 5.68957 14.2498C4.34104 13.7516 3.18969 12.8308 2.40723 11.6248C1.62476 10.4188 1.25311 8.99212 1.3477 7.55762C1.44229 6.12312 1.99806 4.75762 2.93211 3.66479C3.86615 2.57195 5.12844 1.81033 6.53071 1.4935C7.93298 1.17668 9.4001 1.32163 10.7133 1.90674"
                        stroke="#005AE2"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.6667 2.66675L8 9.34008L6 7.34008"
                        stroke="#005AE2"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1982_957">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Standard Support
                </li>
                <li>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1982_957)">
                      <path
                        d="M14.6666 7.38674V8.00007C14.6658 9.43769 14.2003 10.8365 13.3395 11.988C12.4787 13.1394 11.2688 13.9817 9.89016 14.3893C8.51154 14.797 7.03809 14.748 5.68957 14.2498C4.34104 13.7516 3.18969 12.8308 2.40723 11.6248C1.62476 10.4188 1.25311 8.99212 1.3477 7.55762C1.44229 6.12312 1.99806 4.75762 2.93211 3.66479C3.86615 2.57195 5.12844 1.81033 6.53071 1.4935C7.93298 1.17668 9.4001 1.32163 10.7133 1.90674"
                        stroke="#005AE2"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.6667 2.66675L8 9.34008L6 7.34008"
                        stroke="#005AE2"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1982_957">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Ad-supported
                </li>
              </ul>
            </div>
            <div style={{ marginTop: '8px' }}>
              <h4>Professional</h4>
              <h2>$15/month</h2>
              <p>Ideal for business creators</p>
              <ul>
                <li>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1982_1021)">
                      <path
                        d="M14.6666 7.38674V8.00007C14.6658 9.43769 14.2003 10.8365 13.3395 11.988C12.4787 13.1394 11.2688 13.9817 9.89016 14.3893C8.51154 14.797 7.03809 14.748 5.68957 14.2498C4.34104 13.7516 3.18969 12.8308 2.40723 11.6248C1.62476 10.4188 1.25311 8.99212 1.3477 7.55762C1.44229 6.12312 1.99806 4.75762 2.93211 3.66479C3.86615 2.57195 5.12844 1.81033 6.53071 1.4935C7.93298 1.17668 9.4001 1.32163 10.7133 1.90674"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.6667 2.66675L8 9.34008L6 7.34008"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1982_1021">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Enhanced Link Analytics
                </li>
                <li>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1982_1021)">
                      <path
                        d="M14.6666 7.38674V8.00007C14.6658 9.43769 14.2003 10.8365 13.3395 11.988C12.4787 13.1394 11.2688 13.9817 9.89016 14.3893C8.51154 14.797 7.03809 14.748 5.68957 14.2498C4.34104 13.7516 3.18969 12.8308 2.40723 11.6248C1.62476 10.4188 1.25311 8.99212 1.3477 7.55762C1.44229 6.12312 1.99806 4.75762 2.93211 3.66479C3.86615 2.57195 5.12844 1.81033 6.53071 1.4935C7.93298 1.17668 9.4001 1.32163 10.7133 1.90674"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.6667 2.66675L8 9.34008L6 7.34008"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1982_1021">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Custom Branded Domains
                </li>
                <li>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1982_1021)">
                      <path
                        d="M14.6666 7.38674V8.00007C14.6658 9.43769 14.2003 10.8365 13.3395 11.988C12.4787 13.1394 11.2688 13.9817 9.89016 14.3893C8.51154 14.797 7.03809 14.748 5.68957 14.2498C4.34104 13.7516 3.18969 12.8308 2.40723 11.6248C1.62476 10.4188 1.25311 8.99212 1.3477 7.55762C1.44229 6.12312 1.99806 4.75762 2.93211 3.66479C3.86615 2.57195 5.12844 1.81033 6.53071 1.4935C7.93298 1.17668 9.4001 1.32163 10.7133 1.90674"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.6667 2.66675L8 9.34008L6 7.34008"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1982_1021">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Advanced Link Customization
                </li>
                <li>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1982_1021)">
                      <path
                        d="M14.6666 7.38674V8.00007C14.6658 9.43769 14.2003 10.8365 13.3395 11.988C12.4787 13.1394 11.2688 13.9817 9.89016 14.3893C8.51154 14.797 7.03809 14.748 5.68957 14.2498C4.34104 13.7516 3.18969 12.8308 2.40723 11.6248C1.62476 10.4188 1.25311 8.99212 1.3477 7.55762C1.44229 6.12312 1.99806 4.75762 2.93211 3.66479C3.86615 2.57195 5.12844 1.81033 6.53071 1.4935C7.93298 1.17668 9.4001 1.32163 10.7133 1.90674"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.6667 2.66675L8 9.34008L6 7.34008"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1982_1021">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Priority Support
                </li>
                <li>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1982_1021)">
                      <path
                        d="M14.6666 7.38674V8.00007C14.6658 9.43769 14.2003 10.8365 13.3395 11.988C12.4787 13.1394 11.2688 13.9817 9.89016 14.3893C8.51154 14.797 7.03809 14.748 5.68957 14.2498C4.34104 13.7516 3.18969 12.8308 2.40723 11.6248C1.62476 10.4188 1.25311 8.99212 1.3477 7.55762C1.44229 6.12312 1.99806 4.75762 2.93211 3.66479C3.86615 2.57195 5.12844 1.81033 6.53071 1.4935C7.93298 1.17668 9.4001 1.32163 10.7133 1.90674"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.6667 2.66675L8 9.34008L6 7.34008"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1982_1021">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Ad-free Experience
                </li>
              </ul>
            </div>
            <div
              className="white"
              style={{ borderRadius: '0px 12px 12px 0px' }}
            >
              <h4>Teams</h4>
              <h2>$25/month</h2>
              <p>Share with up to 10 users</p>
              <ul>
                <li>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1982_957)">
                      <path
                        d="M14.6666 7.38674V8.00007C14.6658 9.43769 14.2003 10.8365 13.3395 11.988C12.4787 13.1394 11.2688 13.9817 9.89016 14.3893C8.51154 14.797 7.03809 14.748 5.68957 14.2498C4.34104 13.7516 3.18969 12.8308 2.40723 11.6248C1.62476 10.4188 1.25311 8.99212 1.3477 7.55762C1.44229 6.12312 1.99806 4.75762 2.93211 3.66479C3.86615 2.57195 5.12844 1.81033 6.53071 1.4935C7.93298 1.17668 9.4001 1.32163 10.7133 1.90674"
                        stroke="#005AE2"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.6667 2.66675L8 9.34008L6 7.34008"
                        stroke="#005AE2"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1982_957">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Team Collaboration
                </li>
                <li>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1982_957)">
                      <path
                        d="M14.6666 7.38674V8.00007C14.6658 9.43769 14.2003 10.8365 13.3395 11.988C12.4787 13.1394 11.2688 13.9817 9.89016 14.3893C8.51154 14.797 7.03809 14.748 5.68957 14.2498C4.34104 13.7516 3.18969 12.8308 2.40723 11.6248C1.62476 10.4188 1.25311 8.99212 1.3477 7.55762C1.44229 6.12312 1.99806 4.75762 2.93211 3.66479C3.86615 2.57195 5.12844 1.81033 6.53071 1.4935C7.93298 1.17668 9.4001 1.32163 10.7133 1.90674"
                        stroke="#005AE2"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.6667 2.66675L8 9.34008L6 7.34008"
                        stroke="#005AE2"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1982_957">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  User Roles and Permissions
                </li>
                <li>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1982_957)">
                      <path
                        d="M14.6666 7.38674V8.00007C14.6658 9.43769 14.2003 10.8365 13.3395 11.988C12.4787 13.1394 11.2688 13.9817 9.89016 14.3893C8.51154 14.797 7.03809 14.748 5.68957 14.2498C4.34104 13.7516 3.18969 12.8308 2.40723 11.6248C1.62476 10.4188 1.25311 8.99212 1.3477 7.55762C1.44229 6.12312 1.99806 4.75762 2.93211 3.66479C3.86615 2.57195 5.12844 1.81033 6.53071 1.4935C7.93298 1.17668 9.4001 1.32163 10.7133 1.90674"
                        stroke="#005AE2"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.6667 2.66675L8 9.34008L6 7.34008"
                        stroke="#005AE2"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1982_957">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Enhanced Security
                </li>
                <li>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1982_957)">
                      <path
                        d="M14.6666 7.38674V8.00007C14.6658 9.43769 14.2003 10.8365 13.3395 11.988C12.4787 13.1394 11.2688 13.9817 9.89016 14.3893C8.51154 14.797 7.03809 14.748 5.68957 14.2498C4.34104 13.7516 3.18969 12.8308 2.40723 11.6248C1.62476 10.4188 1.25311 8.99212 1.3477 7.55762C1.44229 6.12312 1.99806 4.75762 2.93211 3.66479C3.86615 2.57195 5.12844 1.81033 6.53071 1.4935C7.93298 1.17668 9.4001 1.32163 10.7133 1.90674"
                        stroke="#005AE2"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.6667 2.66675L8 9.34008L6 7.34008"
                        stroke="#005AE2"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1982_957">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  API Access
                </li>
                <li>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1982_957)">
                      <path
                        d="M14.6666 7.38674V8.00007C14.6658 9.43769 14.2003 10.8365 13.3395 11.988C12.4787 13.1394 11.2688 13.9817 9.89016 14.3893C8.51154 14.797 7.03809 14.748 5.68957 14.2498C4.34104 13.7516 3.18969 12.8308 2.40723 11.6248C1.62476 10.4188 1.25311 8.99212 1.3477 7.55762C1.44229 6.12312 1.99806 4.75762 2.93211 3.66479C3.86615 2.57195 5.12844 1.81033 6.53071 1.4935C7.93298 1.17668 9.4001 1.32163 10.7133 1.90674"
                        stroke="#005AE2"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.6667 2.66675L8 9.34008L6 7.34008"
                        stroke="#005AE2"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1982_957">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Dedicated Account Manager
                </li>
              </ul>
            </div>
          </div>
          <div>
            <button>Get Custom Pricing</button>
            <button>Select Pricing</button>
          </div>
        </section>

        {/* Form Section */}
        <section className="background" style={{ width: '100vw' }}>
          <div id="form">
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                shortenUrl();
              }}
            >
              <input
                type="url"
                placeholder="Paste URL here..."
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
              />
              <select name="Choose Domain" id="Choose Domain">
                <option value="Domain" selected>
                  Choose Domain
                </option>
              </select>
              <input type="text" name="Alias" placeholder="Type Alias here" />
              <button type="submit">
                Trim URL{' '}
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.45887 4.31619C5.43991 4.5416 5.11191 4.59859 5.00642 4.39481L4.43834 3.29767C4.4016 3.22658 4.32675 3.17907 4.24209 3.17292L2.93485 3.07809C2.692 3.06049 2.63061 2.75601 2.85016 2.65807L4.03196 2.13074C4.10849 2.09658 4.15977 2.02715 4.16632 1.94854L4.26849 0.73494C4.28745 0.509529 4.61545 0.452535 4.72095 0.656321L5.28902 1.75346C5.32576 1.82455 5.40052 1.87207 5.48527 1.87821L6.79252 1.97303C7.03536 1.99064 7.09675 2.29511 6.8772 2.39306L5.6954 2.92039C5.61878 2.95457 5.56759 3.02397 5.56104 3.10259L5.45887 4.31619Z"
                    fill="white"
                  />
                  <path
                    d="M1.70605 5.1442C1.6744 5.25336 1.50755 5.25336 1.4759 5.1442L1.30543 4.55649C1.29442 4.51841 1.26233 4.48867 1.22134 4.47842L0.58827 4.32018C0.470666 4.29079 0.470666 4.13591 0.58827 4.10652L1.22134 3.94828C1.26233 3.93802 1.29442 3.90828 1.30543 3.87021L1.4759 3.28249C1.50755 3.17333 1.6744 3.17333 1.70605 3.28249L1.87652 3.87021C1.88754 3.90828 1.91957 3.93802 1.96061 3.94828L2.59368 4.10652C2.71129 4.13591 2.71129 4.29079 2.59368 4.32018L1.96061 4.47842C1.91957 4.48867 1.88754 4.51841 1.87652 4.55649L1.70605 5.1442Z"
                    fill="white"
                  />
                  <path
                    d="M3.88769 8.51993C3.85604 8.6291 3.68919 8.6291 3.65754 8.51993L3.48707 7.93222C3.47606 7.89414 3.44398 7.8644 3.40298 7.85415L2.76991 7.69591C2.65231 7.66652 2.65231 7.51164 2.76991 7.48225L3.40298 7.32401C3.44398 7.31375 3.47606 7.28402 3.48707 7.24594L3.65754 6.65822C3.68919 6.54906 3.85604 6.54906 3.88769 6.65822L4.05816 7.24594C4.06918 7.28402 4.10121 7.31375 4.14226 7.32401L4.77532 7.48225C4.89293 7.51164 4.89293 7.66652 4.77532 7.69591L4.14226 7.85415C4.10121 7.8644 4.06918 7.89414 4.05816 7.93222L3.88769 8.51993Z"
                    fill="white"
                  />
                  <path
                    d="M2.03133 7.19688C2.01023 7.26966 1.899 7.26966 1.87789 7.19688L1.76425 6.80507C1.75691 6.77969 1.73552 6.75986 1.70819 6.75303L1.28614 6.64753C1.20774 6.62794 1.20774 6.52469 1.28614 6.50509L1.70819 6.3996C1.73552 6.39276 1.75691 6.37294 1.76425 6.34755L1.87789 5.95574C1.899 5.88297 2.01023 5.88297 2.03133 5.95574L2.14498 6.34755C2.15232 6.37294 2.17367 6.39276 2.20104 6.3996L2.62308 6.50509C2.70149 6.52469 2.70149 6.62794 2.62308 6.64753L2.20104 6.75303C2.17367 6.75986 2.15232 6.77969 2.14498 6.80507L2.03133 7.19688Z"
                    fill="white"
                  />
                  <path
                    d="M7.12215 5.84654C7.10105 5.91932 6.98982 5.91932 6.96871 5.84654L6.85507 5.45473C6.84773 5.42935 6.82634 5.40952 6.79901 5.40268L6.37696 5.29719C6.29856 5.2776 6.29856 5.17434 6.37696 5.15475L6.79901 5.04926C6.82634 5.04242 6.84773 5.0226 6.85507 4.99721L6.96871 4.6054C6.98982 4.53263 7.10105 4.53263 7.12215 4.6054L7.2358 4.99721C7.24314 5.0226 7.2645 5.04242 7.29186 5.04926L7.7139 5.15475C7.79231 5.17434 7.79231 5.2776 7.7139 5.29719L7.29186 5.40268C7.2645 5.40952 7.24314 5.42935 7.2358 5.45473L7.12215 5.84654Z"
                    fill="white"
                  />
                  <path
                    d="M14.3182 14.0032L13.5909 14.6783M4.15777 5.0424L15.9624 15.0878C16.2555 15.3372 16.2654 15.7631 15.9843 16.024V16.024C15.7043 16.284 15.2496 16.2779 14.9805 16.0081C10.9047 11.9232 3.72842 4.70759 4.15777 5.0424Z"
                    stroke="white"
                  />
                </svg>
              </button>
            </form>
            <p>
              By clicking TrimURL, I agree to the
              <strong>Terms of Service, Privacy Policy</strong> and Use of
              Cookies.
            </p>
          </div>
          {shortenedUrl && (
            <p className="result">
              Shortened URL:{' '}
              <a className="result_url" href={shortenedUrl} target="_blank">
                {shortenedUrl}
              </a>
            </p>
          )}
          {error && <p>{error}</p>}
        </section>

        {/* FAQs */}
        <section id="faqs">
          <div id="list">
            <div style={{ textAlign: 'center' }}>
              {/* Make it centered with image */}
              <svg
                width="6"
                height="48"
                viewBox="0 0 6 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.94995 0V48"
                  stroke="url(#paint0_linear_1982_1067)"
                  stroke-width="5"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_1982_1067"
                    x1="2.99995"
                    y1="0"
                    x2="2.99995"
                    y2="48"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#112232" />
                    <stop offset="1" stop-color="#4D6B88" stop-opacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              <h2>FAQs</h2>
            </div>
            <div id="li">
              <ol>
                <li>
                  {/* p tags to be able to position img tags */}
                  <div className="align">
                    <p>How does URL shortening work?</p>
                  </div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19"
                      stroke="#141414"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <p style={{ fontSize: '16px' }}>
                    URL shortening works by taking a long URL and creating a
                    shorter, condensed version that redirects to the original
                    URL. When a user clicks on the shortened link, they are
                    redirected to the intended destination.
                  </p>
                </li>
                <li>
                  <div className="align">
                    <p>
                      Is it necessary to create an account to use the URL
                      shortening service?
                    </p>
                  </div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5V19"
                      stroke="#141414"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5 12H19"
                      stroke="#141414"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </li>
                <li>
                  <div className="align">
                    <p>Are the shortened links permanent? Will they expire?</p>
                  </div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5V19"
                      stroke="#141414"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5 12H19"
                      stroke="#141414"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </li>
                <li>
                  <div className="align">
                    <p>
                      Are there any limitations on the number of URLs I can
                      shorten?
                    </p>
                  </div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5V19"
                      stroke="#141414"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5 12H19"
                      stroke="#141414"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </li>
                <li>
                  <div className="align">
                    <p>
                      Can I customize the shortened URLs to reflect my brand or
                      content?
                    </p>
                  </div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5V19"
                      stroke="#141414"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5 12H19"
                      stroke="#141414"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </li>
                <li>
                  <div className="align">
                    <p>Can I track the performance of my shortened URLs?</p>
                  </div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5V19"
                      stroke="#141414"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5 12H19"
                      stroke="#141414"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </li>
                <li>
                  <div className="align">
                    <p>
                      How secure is the URL shortening service? Are the
                      shortened links protected against spam or malicious
                      activity?
                    </p>
                  </div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5V19"
                      stroke="#141414"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5 12H19"
                      stroke="#141414"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </li>
                <li>
                  <div className="align">
                    <p>What is a QR code and what can it do?</p>
                  </div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5V19"
                      stroke="#141414"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5 12H19"
                      stroke="#141414"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </li>
                <li>
                  <div className="align">
                    <p>
                      Is there an API available for integrating the URL
                      shortening service into my own applications or websites?
                    </p>
                  </div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5V19"
                      stroke="#141414"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5 12H19"
                      stroke="#141414"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Second to last section */}
        <section id="last2">
          <div>
            <h2>Revolutionizing Link Optimization</h2>
            <button>Get Started</button>
          </div>
        </section>

        {/* last section -footer section */}
        <footer>
          <div id="footer">
            <svg
              width="155"
              height="40"
              viewBox="0 0 155 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: 'block' }}
            >
              <path
                d="M31.5606 8.43938C30.9748 7.85354 30.0167 7.85354 29.4308 8.43938L26.3778 11.4948C25.1269 10.6627 23.6915 10.2497 22.25 10.2497C20.331 10.2497 18.3872 10.9822 16.9472 12.4469L12.4472 16.9472C9.88083 19.5106 9.56451 23.4747 11.4922 26.384L8.43938 29.4394C7.85354 30.0253 7.85354 30.9745 8.43938 31.5606C8.73242 31.8536 9.11619 32 9.49995 32C9.88395 32 10.2675 31.8536 10.5605 31.5606L13.6133 28.5051C14.8645 29.3372 16.3085 29.7502 17.75 29.7502C19.6441 29.7502 21.5878 29.0178 23.0528 27.553L27.5442 23.053C30.1105 20.4893 30.4269 16.5252 28.4989 13.616L31.5606 10.5605C32.1465 9.97466 32.1465 9.02522 31.5606 8.43938ZM26.7412 17.75C26.7412 18.9512 26.2724 20.0821 25.4231 20.9317L20.9317 25.4317C20.0792 26.2813 18.9265 26.75 17.75 26.75C17.0703 26.75 16.4199 26.5832 15.8223 26.2988L18.0358 24.0605C18.6217 23.4747 18.6217 22.5255 18.0358 21.9394C17.4747 21.3536 16.5255 21.3536 15.9397 21.9394L13.7014 24.1777C13.4144 23.5829 13.2502 22.9325 13.2502 22.25C13.2502 21.0488 13.7189 19.9179 14.5685 19.0683L19.0436 14.5683C19.8932 13.7187 21.0488 13.25 22.25 13.25C22.9297 13.25 23.577 13.4168 24.1748 13.7012L21.8926 15.9862C21.3068 16.572 21.3068 17.5212 21.8926 18.1073C22.1857 18.4004 22.5692 18.5468 22.9532 18.5468C23.3341 18.5468 23.7179 18.4004 24.0107 18.1073L26.2902 15.8223C26.577 16.4168 26.7412 17.0674 26.7412 17.75Z"
                fill="#001F3F"
              />
              <path
                d="M40 8V32"
                stroke="#141414"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M55.296 27.336C51.96 27.336 49.632 25.752 48.696 23.184L51.528 21.528C52.176 23.232 53.472 24.096 55.392 24.096C57.24 24.096 58.08 23.352 58.08 22.32C58.08 21.72 57.816 21.264 57.288 20.952C56.76 20.616 55.824 20.256 54.456 19.872C52.944 19.416 52.032 19.056 50.976 18.312C49.944 17.544 49.392 16.392 49.392 14.856C49.392 13.344 49.92 12.12 51 11.232C52.08 10.32 53.4 9.864 54.912 9.864C57.624 9.864 59.76 11.256 60.912 13.632L58.128 15.24C57.456 13.8 56.376 13.08 54.912 13.08C53.544 13.08 52.704 13.776 52.704 14.76C52.704 15.288 52.92 15.72 53.352 16.056C53.808 16.368 54.648 16.728 55.896 17.112L57.048 17.496C57.312 17.568 57.672 17.712 58.128 17.904C58.584 18.072 58.944 18.24 59.184 18.408C59.688 18.72 60.456 19.32 60.768 19.896C61.128 20.472 61.392 21.312 61.392 22.272C61.392 23.832 60.816 25.056 59.688 25.968C58.56 26.88 57.096 27.336 55.296 27.336ZM71.403 27.336C68.883 27.336 66.795 26.496 65.139 24.816C63.483 23.136 62.667 21.072 62.667 18.6C62.667 16.128 63.483 14.04 65.139 12.384C66.795 10.704 68.883 9.864 71.403 9.864C74.451 9.864 77.187 11.4 78.627 13.824L75.771 15.48C74.931 13.968 73.323 13.08 71.403 13.08C69.771 13.08 68.451 13.584 67.443 14.616C66.459 15.648 65.955 16.968 65.955 18.6C65.955 20.208 66.459 21.528 67.443 22.56C68.451 23.592 69.771 24.096 71.403 24.096C73.323 24.096 74.979 23.184 75.771 21.72L78.627 23.376C77.187 25.8 74.475 27.336 71.403 27.336ZM80.6616 27V10.2H83.9736V27H80.6616ZM92.5616 27.336C89.2256 27.336 86.8976 25.752 85.9616 23.184L88.7936 21.528C89.4416 23.232 90.7376 24.096 92.6576 24.096C94.5056 24.096 95.3456 23.352 95.3456 22.32C95.3456 21.72 95.0816 21.264 94.5536 20.952C94.0256 20.616 93.0896 20.256 91.7216 19.872C90.2096 19.416 89.2976 19.056 88.2416 18.312C87.2096 17.544 86.6576 16.392 86.6576 14.856C86.6576 13.344 87.1856 12.12 88.2656 11.232C89.3456 10.32 90.6656 9.864 92.1776 9.864C94.8896 9.864 97.0256 11.256 98.1776 13.632L95.3936 15.24C94.7216 13.8 93.6416 13.08 92.1776 13.08C90.8096 13.08 89.9696 13.776 89.9696 14.76C89.9696 15.288 90.1856 15.72 90.6176 16.056C91.0736 16.368 91.9136 16.728 93.1616 17.112L94.3136 17.496C94.5776 17.568 94.9376 17.712 95.3936 17.904C95.8496 18.072 96.2096 18.24 96.4496 18.408C96.9536 18.72 97.7216 19.32 98.0336 19.896C98.3936 20.472 98.6576 21.312 98.6576 22.272C98.6576 23.832 98.0816 25.056 96.9536 25.968C95.8256 26.88 94.3616 27.336 92.5616 27.336ZM106.038 27.336C102.702 27.336 100.374 25.752 99.4382 23.184L102.27 21.528C102.918 23.232 104.214 24.096 106.134 24.096C107.982 24.096 108.822 23.352 108.822 22.32C108.822 21.72 108.558 21.264 108.03 20.952C107.502 20.616 106.566 20.256 105.198 19.872C103.686 19.416 102.774 19.056 101.718 18.312C100.686 17.544 100.134 16.392 100.134 14.856C100.134 13.344 100.662 12.12 101.742 11.232C102.822 10.32 104.142 9.864 105.654 9.864C108.366 9.864 110.502 11.256 111.654 13.632L108.87 15.24C108.198 13.8 107.118 13.08 105.654 13.08C104.286 13.08 103.446 13.776 103.446 14.76C103.446 15.288 103.662 15.72 104.094 16.056C104.55 16.368 105.39 16.728 106.638 17.112L107.79 17.496C108.054 17.568 108.414 17.712 108.87 17.904C109.326 18.072 109.686 18.24 109.926 18.408C110.43 18.72 111.198 19.32 111.51 19.896C111.87 20.472 112.134 21.312 112.134 22.272C112.134 23.832 111.558 25.056 110.43 25.968C109.302 26.88 107.838 27.336 106.038 27.336ZM128.313 24.816C126.609 26.496 124.545 27.336 122.121 27.336C119.697 27.336 117.633 26.496 115.929 24.816C114.249 23.112 113.409 21.048 113.409 18.6C113.409 16.152 114.249 14.088 115.929 12.408C117.633 10.704 119.697 9.864 122.121 9.864C124.545 9.864 126.609 10.704 128.313 12.408C130.017 14.088 130.857 16.152 130.857 18.6C130.857 21.048 130.017 23.112 128.313 24.816ZM118.257 22.56C119.289 23.592 120.585 24.096 122.121 24.096C123.657 24.096 124.953 23.592 125.985 22.56C127.017 21.528 127.545 20.208 127.545 18.6C127.545 16.992 127.017 15.672 125.985 14.64C124.953 13.608 123.657 13.08 122.121 13.08C120.585 13.08 119.289 13.608 118.257 14.64C117.225 15.672 116.697 16.992 116.697 18.6C116.697 20.208 117.225 21.528 118.257 22.56ZM145.977 27H142.401L139.017 21.168H136.497V27H133.185V10.2H139.905C141.465 10.2 142.785 10.752 143.865 11.832C144.945 12.912 145.497 14.232 145.497 15.768C145.497 17.856 144.201 19.776 142.257 20.664L145.977 27ZM139.905 13.296H136.497V18.264H139.905C141.153 18.264 142.185 17.136 142.185 15.768C142.185 14.4 141.153 13.296 139.905 13.296Z"
                fill="#141414"
              />
            </svg>

            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginLeft: '12px', marginRight: '12px' }}
            >
              <path
                d="M23.0859 5.47656C22.3438 6.53125 21.5625 7.35156 20.7422 7.9375V8.52344C20.7422 11.9609 19.5215 15.0664 17.0801 17.8398C14.6387 20.6133 11.3672 22 7.26562 22C4.60938 22 2.1875 21.2969 0 19.8906C0.234375 19.9297 0.605469 19.9492 1.11328 19.9492C3.30078 19.9492 5.27344 19.2656 7.03125 17.8984C6.01562 17.8594 5.09766 17.5371 4.27734 16.9316C3.45703 16.3262 2.89062 15.5547 2.57812 14.6172C2.96875 14.6953 3.26172 14.7344 3.45703 14.7344C3.88672 14.7344 4.31641 14.6758 4.74609 14.5586C3.65234 14.3633 2.74414 13.8262 2.02148 12.9473C1.29883 12.0684 0.9375 11.0625 0.9375 9.92969V9.8125C1.71875 10.2422 2.42188 10.457 3.04688 10.457C1.67969 9.51953 0.996094 8.19141 0.996094 6.47266C0.996094 5.57422 1.19141 4.79297 1.58203 4.12891C4.12109 7.21484 7.38281 8.85547 11.3672 9.05078C11.2891 8.58203 11.25 8.23047 11.25 7.99609C11.25 6.66797 11.709 5.54492 12.627 4.62695C13.5449 3.70898 14.668 3.25 15.9961 3.25C17.4023 3.25 18.5547 3.73828 19.4531 4.71484C20.5469 4.48047 21.543 4.10938 22.4414 3.60156C22.0898 4.73438 21.4062 5.59375 20.3906 6.17969C21.2891 6.0625 22.1875 5.82812 23.0859 5.47656Z"
                fill="#141414"
              />
            </svg>

            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: '12px' }}
            >
              <path
                d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z"
                stroke="#141414"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 11.3698C16.1234 12.2021 15.9812 13.052 15.5937 13.7988C15.2062 14.5456 14.5931 15.1512 13.8416 15.5295C13.0901 15.9077 12.2384 16.0394 11.4077 15.9057C10.5771 15.7721 9.80971 15.3799 9.21479 14.785C8.61987 14.1901 8.22768 13.4227 8.09402 12.592C7.96035 11.7614 8.09202 10.9097 8.47028 10.1582C8.84854 9.40667 9.45414 8.79355 10.2009 8.40605C10.9477 8.01856 11.7977 7.8764 12.63 7.99981C13.4789 8.1257 14.2648 8.52128 14.8716 9.12812C15.4785 9.73496 15.8741 10.5209 16 11.3698Z"
                stroke="#141414"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: '12px' }}
            >
              <path
                d="M20.7004 1.4375C21.1301 1.4375 21.511 1.58398 21.843 1.87695C22.175 2.16992 22.3411 2.53125 22.3411 2.96094V21.4766C22.3411 21.9062 22.175 22.2676 21.843 22.5605C21.511 22.8535 21.1301 23 20.7004 23H2.302C1.87231 23 1.50122 22.8535 1.18872 22.5605C0.876221 22.2676 0.719971 21.9062 0.719971 21.4766V2.96094C0.719971 2.53125 0.876221 2.16992 1.18872 1.87695C1.50122 1.58398 1.87231 1.4375 2.302 1.4375H20.7004ZM7.10669 19.8359V9.52344H3.94263V19.8359H7.10669ZM5.52466 8.11719C6.03247 8.11719 6.47192 7.93164 6.84302 7.56055C7.21411 7.18945 7.39966 6.75 7.39966 6.24219C7.39966 5.73438 7.21411 5.29492 6.84302 4.92383C6.47192 4.55273 6.03247 4.36719 5.52466 4.36719C5.01685 4.36719 4.57739 4.55273 4.2063 4.92383C3.83521 5.29492 3.64966 5.73438 3.64966 6.24219C3.64966 6.78906 3.82544 7.23828 4.177 7.58984C4.52856 7.94141 4.97778 8.11719 5.52466 8.11719ZM19.1184 19.8359V14.1523C19.1184 12.5898 18.8547 11.3887 18.3274 10.5488C17.8 9.70898 16.7942 9.28906 15.3098 9.28906C13.8254 9.28906 12.8098 9.83594 12.2629 10.9297H12.2043V9.52344H9.15747V19.8359H12.3215V14.7383C12.3215 12.9805 12.9661 12.1016 14.2551 12.1016C14.7629 12.1016 15.1438 12.2676 15.3977 12.5996C15.6516 12.9316 15.7981 13.2441 15.8372 13.5371C15.8762 13.8301 15.8958 14.25 15.8958 14.7969V19.8359H19.1184Z"
                fill="#141414"
              />
            </svg>

            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.9707 1.4375C22.2832 1.4375 22.5664 1.55469 22.8203 1.78906C23.0742 2.02344 23.2012 2.29688 23.2012 2.60938V21.8281C23.2012 22.1406 23.0742 22.4141 22.8203 22.6484C22.5664 22.8828 22.2832 23 21.9707 23H16.4629V14.6797H19.2754L19.6855 11.3984H16.4629V9.28906C16.4629 8.23438 17.0098 7.70703 18.1035 7.70703H19.8027V4.83594C19.2168 4.71875 18.377 4.66016 17.2832 4.66016C16.0332 4.66016 15.0273 5.04102 14.2656 5.80273C13.5039 6.56445 13.123 7.62891 13.123 8.99609V11.3984H10.3105V14.6797H13.123V23H2.75195C2.43945 23 2.16602 22.8828 1.93164 22.6484C1.69727 22.4141 1.58008 22.1406 1.58008 21.8281V2.60938C1.58008 2.29688 1.69727 2.02344 1.93164 1.78906C2.16602 1.55469 2.43945 1.4375 2.75195 1.4375H21.9707Z"
                fill="#141414"
              />
            </svg>
          </div>
          <div id="footergrid">
            <div>
              <h5>Why Scissor ?</h5>
              <ol>
                <li>Scissor 101</li>
                <li>Integrations & API</li>
                <li>Pricing</li>
              </ol>
            </div>
            <div>
              <h5>Solutions</h5>
              <ol>
                <li>Social Media</li>
                <li>Digital Marketing</li>
                <li>Customer Service</li>
                <li>For Developers</li>
              </ol>
            </div>
            <div>
              <h5>Products</h5>
              <ol>
                <li>Link Management</li>
                <li>QR Codes</li>
                <li>Link-in-bio</li>
              </ol>
            </div>
            <div>
              <h5>Company</h5>
              <ol>
                <li>About Scissor</li>
                <li>Careers</li>
                <li>Partners</li>
                <li>Press</li>
                <li>Contact</li>
                <li>Reviews</li>
              </ol>
            </div>
            <div>
              <h5>Resources</h5>
              <ol>
                <li>Blog</li>
                <li>Resource Library</li>
                <li>Developers</li>
                <li>App Connectors</li>
                <li>Support</li>
                <li>Trust Center</li>
                <li>Browser Extension</li>
                <li>Mobile App</li>
              </ol>
            </div>
            <div>
              <h5>Features</h5>
              <ol>
                <li>Branded Links</li>
                <li>Mobile Links</li>
                <li>Campaign</li>
                <li>Management &</li>
                <li>Analytics</li>
                <li>QR Code generation</li>
              </ol>
            </div>
            <div>
              <h5>Legal</h5>
              <ol>
                <li>Privacy Policy</li>
                <li>Cookie Policy</li>
                <li>Terms of Service</li>
                <li>Acceptable Use Policy</li>
                <li>Code of Conduct</li>
              </ol>
            </div>
          </div>
        </footer>
        <div id="lastline">
          <p>Terms of Service</p>
          <svg
            width="2"
            height="12"
            viewBox="0 0 2 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 0V12" stroke="#112232" />
          </svg>

          <p>Security</p>
          <svg
            width="2"
            height="12"
            viewBox="0 0 2 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 0V12" stroke="#112232" />
          </svg>

          <p>Scissor 2023</p>
        </div>
      </main>
    </>
  );
}

export default App;
