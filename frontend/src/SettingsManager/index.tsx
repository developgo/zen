import {
  Section, NumericInput, FormGroup, SectionCard, Tag,
} from '@blueprintjs/core';
import { useEffect, useState } from 'react';

import { GetPort, SetPort } from '../../wailsjs/go/config/config';

import './index.css';

export function SettingsManager() {
  const [state, setState] = useState({
    proxy: {
      port: 0,
    },
    loading: true,
  });

  const fetchPort = async () => {
    const port = await GetPort();
    setState({ ...state, proxy: { port }, loading: false });
  };

  useEffect(() => {
    (async () => {
      await fetchPort();
    })();
  }, []);

  return (
    <div className="settings-manager">
      <div className="settings-manager__section">
        <Tag
          large
          intent="warning"
          fill
          className="settings-manager__section-header"
        >
          Advanced
        </Tag>

        <div className="settings-manager__section-body">
          <FormGroup
            label="Port"
            labelFor="port"
            helperText={`The port the proxy server will listen on (0 for random).
            Be careful when using a port below 1024 as it may require elevated privileges.`}
          >
            <NumericInput
              id="port"
              min={0}
              max={65535}
              value={state.proxy.port}
              onValueChange={(port) => {
                setState({ ...state, proxy: { port } });
                SetPort(port);
              }}
            />
          </FormGroup>
        </div>
      </div>
    </div>
  );
}