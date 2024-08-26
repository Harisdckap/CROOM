import React from "react";
import QRCode from "qrcode.react";

const QRCodeComponent = ({ value }) => {
  return (
    <div className="flex flex-col items-center">
      <QRCode value={value} size={256} />
      <p className="mt-4 text-center text-gray-700">
        Scan this QR code to make a payment.
      </p>
    </div>
  );
};

export default QRCodeComponent;
