import React from 'react';
import { useTranslation } from 'react-i18next';

function Footer1() {
  const [t, i18n] = useTranslation("global");

  return (
    <div className="pen fixed-bottom bg-none" style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src="https://upqrade.xyz/assets/usenow.png"
          alt="Your Image"
          style={{ maxWidth: '40px', marginRight: '10px' }}
        />
        <div style={{ color: 'white', textAlign: 'left' }}>
          <p style={{ fontSize: '12px' }}>
            <b>
              {t("Footer1.body")}<br />
              <a href="mailto:upqrade@perceptionyst.com">upqrade@perceptionyst.com</a> |{' '}
              <a href="https://upqrade.xyz">www.upqrade.xyz</a>
            </b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer1;
