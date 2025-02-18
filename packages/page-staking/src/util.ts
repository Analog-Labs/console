// Copyright 2017-2025 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from '@polkadot/util';

export function convertToNumber (...args: BN[]): number[] {
  return args.map((amount) => parseFloat(amount.toString()));
}
