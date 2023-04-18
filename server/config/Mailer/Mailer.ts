import nodemailer from "nodemailer";

export async function sendMail(otp: number, to: string, from: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nischal0407@xavier.edu.np",
      pass: "xAvier@123",
    },
  });

  let info = await transporter.sendMail({
    from: `${from}`,
    to: `${to}`,
    subject: "Verfication Code ",
    text: `Your Otp code is ${otp}`,
  });

  return info;
}

export async function sendMessageMail(
  message: string,
  title: string,
  to: string,
  from: string
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nischal0407@xavier.edu.np",
      pass: "xAvier@123",
    },
  });

  let info = await transporter.sendMail({
    from: `${from}`,
    to: `${to}`,
    subject: `${title}`,
    text: `${message}`,
  });

  return info;
}
export async function sendMessageFromMail(
  message: string,
  title: string,
  to: string,
  from: string
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nischal0407@xavier.edu.np",
      pass: "xAvier@123",
    },
  });

  let info = await transporter.sendMail({
    from: `${from}`,
    to: `${to}`,
    subject: `${title}`,
    text: `${message}`,
  });

  return info;
}

export async function sendBookingMail(
  startDate: string,
  endDate: string,
  bookingId: string,
  room_number: number | undefined,
  car_number: string | undefined,
  to: string,
  from: string
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nischal0407@xavier.edu.np",
      pass: "xAvier@123",
    },
  });

  if (room_number) {
    let info = await transporter.sendMail({
      from: `${from}`,
      to: `${to}`,
      subject: "Booking Successfull",
      text: `
      Your Room with id ${room_number} has been booked successfully.
       From:${startDate}
       End:${endDate}. 
       Your Booking id is ${bookingId}`,
    });

    return info;
  } else {
    let info = await transporter.sendMail({
      from: `${from}`,
      to: `${to}`,
      subject: "Booking Successfull",
      text: `
      Your Car with number ${car_number} has been booked successfully.
       From:${startDate}
       End:${endDate}. 
       Your Booking id is ${bookingId}`,
    });

    return info;
  }
}
