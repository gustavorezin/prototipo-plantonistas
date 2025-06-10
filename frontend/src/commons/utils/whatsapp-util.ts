const sendMessage = (message: string, phoneNumber: string) => {
  const formattedPhoneNumber = phoneNumber.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);

  const whatsappUrl = `https://wa.me/55${formattedPhoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank");
};

export const whatsappUtil = {
  sendMessage,
};
