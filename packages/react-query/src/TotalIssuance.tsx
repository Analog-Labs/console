// Copyright 2017-2025 @polkadot/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react';

import { useApi, useCall } from '@polkadot/react-hooks';
import { BN } from '@polkadot/util';

import FormatBalance from './FormatBalance.js';

interface Props {
  children?: React.ReactNode;
  className?: string;
  label?: React.ReactNode;
}

function TotalIssuance ({ children, className = '', label }: Props): React.ReactElement<Props> | null {
  const { api } = useApi();
  const totalIssuanceInitial = useCall<string>(api.query.balances?.totalIssuance);
  const airdropTotal = useCall<string>(api.query.airdrop.total);

  const totalIssuance = useMemo(
    () => {
      const total = new BN(totalIssuanceInitial?.toString() || 0).add(new BN(airdropTotal?.toString() || 0));

      return total;
    },
    [airdropTotal, totalIssuanceInitial]
  );

  return (
    <div className={className}>
      {label || ''}
      <FormatBalance
        className={totalIssuance ? '' : '--tmp'}
        value={totalIssuance || 1}
        withSi
      />
      {children}
    </div>
  );
}

export default React.memo(TotalIssuance);
