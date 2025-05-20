import { TContact } from './contact.interface';
import { Contact } from './contact.model';
import emailSender from './emailSender';

const addMessageIndoDB = async (payload: TContact) => {
  const result = await Contact.create(payload);
  return result;
};

const getAllMessageDataFromDB = async () => {
  const result = await Contact.find();
  return result;
};
const sendMessage = async (data: Record<string, string>) => {
  // console.log('sendMessage....', data);

  const { name, phone, subject, email, message } = data;

  await emailSender(
    'devhumayun.tech@gmail.com',

    `<div style="max-width: 100%; padding: 20px; background: #f4f4f7; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 24px; box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);">
      
      <h2 style="color: #4f46e5; font-size: 22px; margin-bottom: 16px;">📬 New Contact Message</h2>
      
      <p style="font-size: 15px; line-height: 1.5; margin-bottom: 20px;">
        You’ve received a new message through your portfolio contact form. Here are the details:
      </p>

      <table style="width: 100%; font-size: 15px; line-height: 1.5;">
        <tr>
          <td style="font-weight: bold; padding: 8px 4px 8px 0; width: 100px;">👤 Name:</td>
          <td style="word-break: break-word;">${name}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 8px 4px 8px 0;">📞 Phone:</td>
          <td style="word-break: break-word;">${phone}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 8px 4px 8px 0;">📧 Email:</td>
          <td style="word-break: break-word;">
            <a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 8px 4px 8px 0;">📝 Subject:</td>
          <td style="word-break: break-word;">${subject}</td>
        </tr>
      </table>

      <div style="margin-top: 24px;">
        <p style="font-weight: bold; margin-bottom: 8px;">💬 Message:</p>
        <div style="background: #f9f9fb; padding: 16px; border-left: 4px solid #4f46e5; border-radius: 8px; font-size: 15px; white-space: pre-line; line-height: 1.6;">
          ${message}
        </div>
      </div>
      
    </div>
  </div>`,
  );
  
};

export const ContactServices = {
  addMessageIndoDB,
  getAllMessageDataFromDB,
  sendMessage,
};
