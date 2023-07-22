import { useState } from 'react';
import Image from 'next/image';
import Backdrop from '@/components/DiscoveryFolder/ReportModal/Backdrop';
import { UndoContainer } from '../../AdminActivities/adminActivities.style';
import trash from '@/public/assets/trash.svg';
import close from '@/public/assets/close-circle-small.svg';
import { tick, cancel } from '@/public/assets/icon';
import { useWidth } from '@/hooks';
import { btnTick, btnCancel } from '@/public/assets/icon';
import { AdDisplay } from '../request.style';
import Link from 'next/link';
import TruncatedText from '@/components/AdminReusables/TruncatedText';

const breakpoint = 1024;
const VisualAdRequest = ({ visualData }) => {
  const { responsive } = useWidth(breakpoint);
  const [showBackdrop, setShowBackdrop] = useState(false);

  const handleCheckbox = (e) => {
    const id = e.target.id;
    const data = [...rowData];
    const checkedValue = data.map((data) =>
      data.id === +id ? { ...data, value: !data.value } : data
    );
    setRowData(checkedValue);
  };

  const handleDelete = () => {
    const data = [...rowData];
    const rows = data.filter((item) => !item.value);
    setRowData(rows);
    if (rows.length !== data.length) {
      setShowBackdrop(true);
    }
  };

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
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Email Address</th>
                <th>social Link</th>
                <th>Action</th>
                <th onClick={handleDelete}>
                  <Image src={trash} alt="trash" />
                </th>
              </tr>
            </thead>
            <tbody>
              {visualData &&
                visualData.data.map((data, index) => (
                  <tr className="row" key={data.id}>
                    <td>{index + 1}</td>
                    <td>
                      <div
                        style={{
                          display: 'flex',
                          gap: '0.5rem',
                          alignItems: 'center',
                        }}
                      >
                        {data.promoter && data.promoter.profilePicture ? (
                          <Image
                            src={data.promoter.profilePicture}
                            alt="profile"
                            width={25}
                            height={25}
                            style={{ borderRadius: '50%' }}
                          />
                        ) : (
                          <div
                            className="noImage"
                            style={{
                              width: '25px',
                              height: '25px',
                              textAlign: 'center',
                              background: '#a09ef9',
                              fontSize: '10px',
                              textTransform: 'uppercase',
                              color: '#ffffff',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: '50%',
                            }}
                          >
                            {data && data.promoter
                              ? data.promoter.accountName.slice(0, 2)
                              : 'AD'}
                          </div>
                        )}
                        {data.promoter && (
                          <TruncatedText
                            maxLength={25}
                            text={data.promoter.accountName}
                          />
                        )}
                      </div>
                    </td>
                    <td>
                      {data.promoter && (
                        <a
                          href={`mailto:${data.promoter.email}`}
                          style={{ color: 'black' }}
                        >
                          <TruncatedText
                            maxLength={25}
                            text={data.promoter.email}
                          />
                        </a>
                      )}
                    </td>
                    <td>
                      {data.promoter && (
                        <a
                          href={data.promoter.socialLink}
                          target="_blank"
                          style={{
                            color: 'black',
                          }}
                        >
                          <TruncatedText
                            maxLength={50}
                            text={data.promoter.socialLink}
                          />
                        </a>
                      )}
                    </td>
                    <td className="action-space">
                      <Image src={tick} /> <Image src={cancel} />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id={data.id}
                        checked={data.value}
                        // onChange={handleCheckbox}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <AdDisplay className="ad-display">
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
              <h3>Visual Ad Request (10)</h3>
              <Image src={trash} alt="trash" />
            </div>

            {visualData &&
              visualData.data.map((data) => (
                <div className="ad-column" key={data._id}>
                  <div className="ad-content">
                    <div className="ad-inner">
                      {data.promoter && data.promoter.profilePicture ? (
                        <Image
                          src={data.promoter.profilePicture}
                          alt="profile"
                          width={25}
                          height={25}
                          style={{ borderRadius: '50%' }}
                        />
                      ) : (
                        <div
                          className="noImage"
                          style={{
                            width: '25px',
                            height: '25px',
                            textAlign: 'center',
                            background: '#a09ef9',
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            color: '#ffffff',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '50%',
                          }}
                        >
                          {data && data.promoter
                            ? data.promoter.accountName.slice(0, 2)
                            : 'AD'}
                        </div>
                      )}{' '}
                      <span>
                        {data.promoter && (
                          <TruncatedText
                            maxLength={25}
                            text={data.promoter.accountName}
                          />
                        )}
                      </span>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id={data._id}
                        checked={data.value}
                        onChange={handleCheckbox}
                      />
                    </div>
                  </div>
                  <div className="ad-text-content">
                    <div className="ad-text-smaller">
                      <span>Email Adress</span>
                    </div>
                    <div className="ad-text-small">
                      <span>
                        {data.promoter && (
                          <a
                            href={`mailto:${data.promoter.email}`}
                            style={{ color: 'black' }}
                          >
                            <TruncatedText
                              maxLength={25}
                              text={data.promoter.email}
                            />
                          </a>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="ad-text-content">
                    <div className="ad-text-smaller">
                      <span>Social links</span>
                    </div>
                    <div className="ad-text-small">
                      <span>
                        {data.promoter && (
                          <a
                            href={data.promoter.socialLink}
                            target="_blank"
                            style={{
                              color: 'black',
                            }}
                          >
                            <TruncatedText
                              maxLength={25}
                              text={data.promoter.socialLink}
                            />
                          </a>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="actions">
                    <button className="sec">
                      <Image
                        src={btnCancel}
                        alt="Wallet Icon"
                        className="img"
                      />
                      <span>Decline </span>
                    </button>
                    <button>
                      <Image src={btnTick} alt="Wallet Icon" className="img" />
                      <span>Accept </span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </AdDisplay>
      )}{' '}
    </>
  );
};

export default VisualAdRequest;
