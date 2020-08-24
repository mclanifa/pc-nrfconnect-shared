/* Copyright (c) 2015 - 2017, Nordic Semiconductor ASA
 *
 * All rights reserved.
 *
 * Use in source and binary forms, redistribution in binary form only, with
 * or without modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions in binary form, except as embedded into a Nordic
 *    Semiconductor ASA integrated circuit in a product or a software update for
 *    such product, must reproduce the above copyright notice, this list of
 *    conditions and the following disclaimer in the documentation and/or other
 *    materials provided with the distribution.
 *
 * 2. Neither the name of Nordic Semiconductor ASA nor the names of its
 *    contributors may be used to endorse or promote products derived from this
 *    software without specific prior written permission.
 *
 * 3. This software, with or without modification, must only be used with a Nordic
 *    Semiconductor ASA integrated circuit.
 *
 * 4. Any software provided in binary form under this license must not be reverse
 *    engineered, decompiled, modified and/or disassembled.
 *
 * THIS SOFTWARE IS PROVIDED BY NORDIC SEMICONDUCTOR ASA "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY, NONINFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL NORDIC SEMICONDUCTOR ASA OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
 * TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import nrf51logo from './nRF51-Series-logo.svg';
import nrf52logo from './nRF52-Series-logo.svg';
import nrf53logo from './nRF53-Series-logo.svg';
import nrf91logo from './nRF91-Series-logo.svg';
import unknownLogo from './unknown-logo.svg';
import unknownNordicLogo from './unknown-nordic-logo.svg';

const deviceInfo = pcaNumber => ({
    PCA10028: {
        name: 'nRF51 DK',
        cores: 1,
        icon: nrf51logo,
        website: {
            productPagePath: 'Development-Kits/nRF51-DK',
            buyOnlineParams: 'search_token=nrf51-DK&series_token=nRF51822',
        },
    },
    PCA10031: {
        name: 'nRF51 Dongle',
        cores: 1,
        icon: nrf51logo,
        website: {
            productPagePath: 'Development-Kits/nRF51-Dongle',
            buyOnlineParams: 'search_token=nRF51-Dongle&series_token=nRF51822',
        },
    },
    PCA10040: {
        name: 'nRF52 DK',
        cores: 1,
        icon: nrf52logo,
        website: {
            productPagePath: 'Development-Kits/nRF52-DK',
            buyOnlineParams: 'search_token=nRF52-DK&series_token=nRF52832',
        },
    },
    PCA10056: {
        name: 'nRF52840 DK',
        cores: 1,
        icon: nrf52logo,
        website: {
            productPagePath: 'Development-Kits/nRF52840-DK',
            buyOnlineParams: 'search_token=nrf52840-DK&series_token=nRF52840',
        },
    },
    PCA10059: {
        name: 'nRF52840 Dongle',
        cores: 1,
        icon: nrf52logo,
        website: {
            productPagePath: 'Development-Kits/nRF52840-Dongle',
            buyOnlineParams: 'search_token=nRF52840DONGLE&series_token=nRF52840',
        },
    },
    PCA10090: {
        name: 'nRF9160 DK',
        cores: 1,
        icon: nrf91logo,
        website: {
            productPagePath: 'Development-Kits/nRF9160-DK',
            buyOnlineParams: 'search_token=nrf9160-DK&series_token=nRF9160',
        },
    },
    PCA10100: {
        name: 'nRF52833 DK',
        cores: 1,
        icon: nrf52logo,
        website: {
            productPagePath: 'Development-Kits/nRF52833-DK',
            buyOnlineParams: 'search_token=nRF52833-DK&series_token=nRF52833',
        },
    },
    PCA10095: {
        name: 'nRF5340 DK',
        cores: 2,
        icon: nrf53logo,
        website: {
            productPagePath: 'Development-Kits/nRF5340-PDK',
            buyOnlineParams: 'search_token=nRF5340-PDK&series_token=nRF5340',
        },
    },
    PCA20020: {
        name: 'Nordic Thingy:52',
        cores: 1,
        icon: nrf52logo,
        website: {
            productPagePath: 'Prototyping-platforms/Nordic-Thingy-52',
            buyOnlineParams: 'search_token=nRF6936&series_token=nRF52832',
        },
    },
    PCA20035: {
        name: 'Nordic Thingy:91',
        cores: 1,
        icon: nrf91logo,
        website: {
            productPagePath: 'Prototyping-platforms/Nordic-Thingy-91',
            buyOnlineParams: 'search_token=nRF6943&series_token=nRF9160',
        },
    },
}[String(pcaNumber).toUpperCase()] || { website: {} });

const NORDIC_VENDOR_ID = '1915';
const isNordicDevice = device => (
    device.serialport && device.serialport.vendorId === NORDIC_VENDOR_ID
);

const iconForUnknown = device => (isNordicDevice(device) ? unknownNordicLogo : unknownLogo);

export const deviceIcon = device => (
    deviceInfo(device.boardVersion).icon || iconForUnknown(device)
);

export const deviceName = device => {
    const pca = device.boardVersion;
    if (deviceInfo(pca).name) {
        return deviceInfo(pca).name;
    }

    if (device.usb && device.usb.product) {
        return device.usb.product;
    }

    return null;
};

export const displayedDeviceName = (device, { respectNickname = true } = {}) => {
    if (respectNickname && device.nickname) {
        return device.nickname;
    }

    return deviceName(device) || device.boardVersion || 'Unknown';
};

export const serialports = device => (
    Object.entries(device)
        .filter(([key]) => key.startsWith('serialport'))
        .map(([, value]) => value)
);

export const cores = pca => deviceInfo(pca).cores;

export const productPageUrl = pca => (
    deviceInfo(pca).website.productPagePath
    && `https://www.nordicsemi.com/Software-and-tools/${deviceInfo(pca).website.productPagePath}`
);

export const buyOnlineUrl = pca => (
    deviceInfo(pca).website.buyOnlineParams
    && `https://www.nordicsemi.com/About-us/BuyOnline?${deviceInfo(pca).website.buyOnlineParams}`
);
