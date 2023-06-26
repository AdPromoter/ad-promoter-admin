import { useState, useEffect } from 'react';
import {
  RequestSettings,
  RequestSettingsMobile,
  Container,
} from '@/components/AdminPages/AdminRequest/request.style';
import { requestCategories } from '@/data/RequestCategories/requestCategories';
import profile1 from '@/public/assets/hassan.svg';
import profile2 from '@/public/assets/mh.svg';
import profile3 from '@/public/assets/oldlad.svg';
import {
  VisualAdRequest,
  ReportedAds,
  SocialAdRequest,
  WithdrawalRequest,
} from '@/components/AdminPages/AdminRequest/categories';
import arrowUp from '@/public/assets/arrow-up.svg';
import arrowDown from '@/public/assets/arrow-down.svg';
import Image from 'next/image';
import { useWidth } from '@/hooks';
import UseFetch from '@/hooks/useFetch';
import PageLoader from '@/components/AdminReusables/PageLoager.jsx/index.jsx';
import Filter from '@/components/AdminReusables/Filter';
import Head from 'next/head';


const breakpoint = 1024;
const Settings = () => {
  const { responsive } = useWidth(breakpoint);

  const [selected, setSelected] = useState('Visual Ad Request');
  const [showDropdown, setShowDropdown] = useState(false);
  const [token, setToken] = useState(null);
  const [tokenAvailale, setTokenAvailable] = useState(false);

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('user'));
    if (userToken) {
      setToken(userToken.token);
      setTokenAvailable(true);
      console.log(userToken.token);
    }
  }, []);

  const {
    data: responseData,
    pending,
    error,
  } = UseFetch(
    token,
    tokenAvailale,
    'https://api.ad-promoter.com/api/v1/reports/reportedAds'
  );

  const onShowDropDownHandler = () => {
    setShowDropdown(!showDropdown);
  };

  const onCloseDropdownHandler = () => {
    setShowDropdown(!showDropdown);
  };

  let reportData = responseData;

  if (pending) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <h3
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          height: '75vh',
        }}
      >
        Unable to fetch data | Please try again
      </h3>
    );
  }

  if (!responseData) {
    return <PageLoader />;
  }

  return (
    <Container>
            <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {responsive ? (
        <RequestSettings>
          <main>
            <div className="log">
              <span>
                <ul className="categories">
                  {requestCategories.map((category) => (
                    <li
                      key={category.id}
                      onClick={() => setSelected(category.category)}
                      style={{
                        color:
                          selected == category.category
                            ? 'var(--black)'
                            : '#9e82bd',
                        fontSize: selected == category.category ? '1.5rem' : '',
                        fontWeight:
                          selected == category.category ? '500' : '400',
                        borderBottom:
                          category.category == selected
                            ? '2.5px solid var(--primary)'
                            : '',
                      }}
                    >
                      {category.category}
                    </li>
                  ))}
                </ul>
              </span>
              <Filter
                onShowDropDown={onShowDropDownHandler}
                onCloseDropdown={onCloseDropdownHandler}
                showDropdown={showDropdown}
              />
            </div>

            <div className="contents">
              {selected == 'Visual Ad Request' ? (
                <VisualAdRequest />
              ) : selected == 'Social Ad Request' ? (
                <SocialAdRequest />
              ) : selected == 'Withdrawal Request' ? (
                <WithdrawalRequest />
              ) : selected == 'Reported Ads' ? (
                <ReportedAds
                  reportData={reportData}
                  pending={pending}
                  error={error}
                />
              ) : (
                ''
              )}
            </div>
          </main>
        </RequestSettings>
      ) : (
        <RequestSettingsMobile>
          <main className="">
            <div className="log">
              <div className="categories-group">
                <ul className="categories">
                  {requestCategories.map((category) => (
                    <li
                      key={category.id}
                      onClick={() => setSelected(category.category)}
                      style={{
                        color:
                          selected == category.category ? '#4F00CF' : '#808080',
                        backgroundColor:
                          selected == category.category ? '#F4F4F4' : '#FFFFFF',
                        fontSize:
                          selected == category.category ? '14px' : '13px',
                        fontWeight:
                          selected == category.category ? '500' : '400',
                        border:
                          category.category == selected
                            ? '2px solid #D3B8FF'
                            : '1px solid #D3B8FF',
                        borderRadius: '1000px',
                        width: '20rem',
                        display: 'inline-block',
                        textAlign: 'center',
                        padding: '1rem 0 ',
                      }}
                    >
                      {category.category}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Filter
                onShowDropDown={onShowDropDownHandler}
                onCloseDropdown={onCloseDropdownHandler}
                showDropdown={showDropdown}
              />

            <div className="contents">
              {selected == 'Visual Ad Request' ? (
                <VisualAdRequest />
              ) : selected == 'Social Ad Request' ? (
                <SocialAdRequest />
              ) : selected == 'Withdrawal Request' ? (
                <WithdrawalRequest />
              ) : selected == 'Reported Ads' ? (
                <ReportedAds
                  reportData={reportData}
                  pending={pending}
                  error={error}
                />
              ) : (
                ''
              )}
            </div>
          </main>
        </RequestSettingsMobile>
      )}{' '}
    </Container>
  );
};

export default Settings;
