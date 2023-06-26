import { useState } from 'react';
import Image from 'next/image';
import Backdrop from '@/components/DiscoveryFolder/ReportModal/Backdrop';
import { UndoContainer } from '../../AdminActivities/adminActivities.style';
import close from '@/public/assets/close-circle-small.svg';
import {
  send,
  cup,
  refresh,
  moneySend,
  status,
} from '@/public/assets/icon';
import Link from 'next/link';
import { useWidth } from '@/hooks';
import profile1 from '@/public/assets/hassan.svg';
import trash from '@/public/assets/trash.svg';
import { AdDisplay } from '../request.style';

const breakpoint = 1024;
const ReportedAds = ({ reportData, pending, error }) => {
  const [showBackdrop, setShowBackdrop] = useState(false);
  const { responsive } = useWidth(breakpoint);

  return (
    <>
      {responsive ? (
        <div>
          {' '}
          {showBackdrop && <Backdrop onCancel={() => setShowBackdrop(false)} />}
          <UndoContainer
            style={{
              transform: showBackdrop ? 'translateX(0)' : 'translateX(-100vw)',
            }}
          >
            <div className="activity">Activity deleted</div>
            <div className="undo" onClick={() => setShowBackdrop(false)}>
              <p>Undo</p>
              <Image src={close} alt="close" />
            </div>
          </UndoContainer>
          {pending && <h4>Loading Report Ads...</h4>}
          {error && <h4>Something is wrong!!</h4>}
          <table>
            <tbody>
              {reportData &&
                reportData.data.map((data, index) => (
                  <tr className="row" key={index}>
                    <td>
                      <div
                        style={{
                          display: 'flex',
                          gap: '0.5rem',
                          alignItems: 'center',
                        }}
                      >
                        <p>
                          <span className="group">
                            {' '}
                            <Image src={profile1} width={15} />
                            <span className="title">Product Name</span>
                          </span>
                          <span className="data-name">{data.productName}</span>
                        </p>
                      </div>
                    </td>
                    <td>
                      <span className="group">
                        <Image src={send} width={15} />
                        <span className="title">Advert Type</span>
                      </span>
                      <span className="data-name">{data.type}</span>
                    </td>
                    <td>
                      {' '}
                      <span className="group">
                        {' '}
                        <Image src={cup} width={15} />
                        <span className="title">Aim</span>
                      </span>
                      <span className="data-name">{data.target} Videos</span>
                    </td>
                    <td>
                      {' '}
                      <span className="group">
                        {' '}
                        <Image src={refresh} width={15} />
                        <span className="title">Archived</span>
                      </span>
                      <span className="data-name">no data</span>
                    </td>
                    <td>
                      {' '}
                      <span className="group">
                        {' '}
                        <Image src={moneySend} width={15} />
                        <span className="title">Price</span>
                      </span>
                      <span className="data-name">no data</span>
                    </td>
                    <td>
                      {' '}
                      <span className="group">
                        {' '}
                        <Image src={status} width={15} />
                        <span className="title">Status</span>
                      </span>
                      <span className="data-name">
                        <button
                          className={
                            data.approvalStatus == false
                              ? 'progress' || data.approvalStatus == true
                              : 'complete'
                          }
                        >
                          {data.approvalStatus == true
                            ? 'Completed'
                            : 'In Progress'}
                        </button>
                      </span>
                    </td>
                    <td>
                      <Link href={`/reportedAds/${data._id}`}>
                        <button className="view-button">View</button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <AdDisplay className='ad-display'>
          {' '}
          {showBackdrop && <Backdrop onCancel={() => setShowBackdrop(false)} />}
          <UndoContainer
            style={{
              transform: showBackdrop ? 'translateX(0)' : 'translateX(-100vw)',
            }}
          >
            <div className="activity">Activity deleted</div>
            <div className="undo" onClick={() => setShowBackdrop(false)}>
              <p>Undo</p>
              <Image src={close} alt="close" />
            </div>
          </UndoContainer>
          <div className="ad-group">
            <div className="ad-header">
              <h3>Reported adverts</h3>
              <Image src={trash} alt="trash" />
            </div>
            {reportData &&
              reportData.data.map((data) => (
                <div className="ad-column" key={data.id}>
                  <div className="ad-content">
                    <div className="ad-inner">
                      <Image src={profile1} alt="profile" />
                      <span>Maharm Hassanli</span>
                    </div>
                    <div>
                      <div className="status-text">
                        <Image src={status} width={10} />
                        <p >Status</p>
                      </div>
                      <span>
                        <button
                          className={
                            data.approvalStatus == false
                              ? 'progress' || data.approvalStatus == true
                              : 'complete'
                          }
                        >
                          {data.approvalStatus == true
                            ? 'Completed'
                            : 'In Progress'}
                        </button>
                      </span>
                    </div>
                  </div>
                  <div className="ad-text-content">
                    <div className="ad-text-smaller">
                      <span>Product Name</span>
                    </div>
                    <div className="ad-text-small-right">
                      <span>{data.productName}</span>
                    </div>
                  </div>
                  <div className="ad-text-content">
                    <div className="ad-text-smaller">
                      <span>Advert Type</span>
                    </div>
                    <div className="ad-text-small-right">
                      <span>{data.type}</span>
                    </div>
                  </div>
                  <div className='view-button-report-div'>
                  <Link href={`/reportedAds/${data._id}`}>
                    <button className="view-button">View</button>
                  </Link>
                  </div>
                </div>
              ))}
          </div>
        </AdDisplay>
      )}
    </>
  );
};

export default ReportedAds;
