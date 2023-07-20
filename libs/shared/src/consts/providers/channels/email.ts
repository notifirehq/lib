import {
  mailerSendConfig,
  mailgunConfig,
  mailjetConfig,
  mandrillConfig,
  netCoreConfig,
  nodemailerConfig,
  postmarkConfig,
  sendgridConfig,
  brevoConfig,
  sesConfig,
  outlook365Config,
  infobipEmailConfig,
  resendConfig,
  sparkpostConfig,
  emailWebhookConfig,
} from '../credentials';
import { IProviderConfig } from '../provider.interface';
import { EmailProviderIdEnum } from '../provider.enum';

import { ChannelTypeEnum } from '../../../types';

export const emailProviders: IProviderConfig[] = [
  {
    id: EmailProviderIdEnum.Novu,
    displayName: 'Novu Email',
    channel: ChannelTypeEnum.EMAIL,
    credentials: [],
    docReference: 'https://docs.novu.co/channels/email/',
    logoFileName: { light: 'novu.png', dark: 'novu.png' },
  },
  {
    id: EmailProviderIdEnum.Mailgun,
    displayName: 'Mailgun',
    channel: ChannelTypeEnum.EMAIL,
    credentials: mailgunConfig,
    docReference: 'https://docs.novu.co/channels/email/mailgun',
    logoFileName: { light: 'mailgun.svg', dark: 'mailgun.svg' },
  },
  {
    id: EmailProviderIdEnum.Mailjet,
    displayName: 'Mailjet',
    channel: ChannelTypeEnum.EMAIL,
    credentials: mailjetConfig,
    docReference: 'https://docs.novu.co/channels/email/mailjet',
    logoFileName: { light: 'mailjet.png', dark: 'mailjet.png' },
  },
  {
    id: EmailProviderIdEnum.Mandrill,
    displayName: 'Mandrill',
    channel: ChannelTypeEnum.EMAIL,
    credentials: mandrillConfig,
    docReference: 'https://docs.novu.co/channels/email/mandrill',
    logoFileName: { light: 'mandrill.svg', dark: 'mandrill.svg' },
  },
  {
    id: EmailProviderIdEnum.Postmark,
    displayName: 'Postmark',
    channel: ChannelTypeEnum.EMAIL,
    credentials: postmarkConfig,
    docReference: 'https://docs.novu.co/channels/email/postmark',
    logoFileName: { light: 'postmark.png', dark: 'postmark.png' },
  },
  {
    id: EmailProviderIdEnum.SendGrid,
    displayName: 'SendGrid',
    channel: ChannelTypeEnum.EMAIL,
    credentials: sendgridConfig,
    docReference: 'https://docs.novu.co/channels/email/sendgrid',
    logoFileName: { light: 'sendgrid.png', dark: 'sendgrid.png' },
  },
  {
    id: EmailProviderIdEnum.Sendinblue,
    displayName: 'Brevo',
    channel: ChannelTypeEnum.EMAIL,
    credentials: brevoConfig,
    docReference: 'https://docs.novu.co/channels/email/brevo',
    logoFileName: { light: 'brevo.png', dark: 'brevo.png' },
  },
  {
    id: EmailProviderIdEnum.SES,
    displayName: 'SES',
    channel: ChannelTypeEnum.EMAIL,
    credentials: sesConfig,
    docReference: 'https://docs.novu.co/channels/email/ses',
    logoFileName: { light: 'ses.svg', dark: 'ses.svg' },
  },
  {
    id: EmailProviderIdEnum.NetCore,
    displayName: 'NetCore',
    channel: ChannelTypeEnum.EMAIL,
    credentials: netCoreConfig,
    docReference: 'https://docs.novu.co/channels/email/netcore',
    logoFileName: { light: 'netcore.png', dark: 'netcore.png' },
  },
  {
    id: EmailProviderIdEnum.CustomSMTP,
    displayName: 'Custom SMTP',
    channel: ChannelTypeEnum.EMAIL,
    credentials: nodemailerConfig,
    docReference: 'https://docs.novu.co/channels/email/custom-smtp',
    logoFileName: { light: 'custom_smtp.svg', dark: 'custom_smtp.svg' },
  },
  {
    id: EmailProviderIdEnum.MailerSend,
    displayName: 'MailerSend',
    channel: ChannelTypeEnum.EMAIL,
    credentials: mailerSendConfig,
    docReference: 'https://docs.novu.co/channels/email/mailersend',
    logoFileName: { light: 'mailersend.svg', dark: 'mailersend.svg' },
  },
  {
    id: EmailProviderIdEnum.Outlook365,
    displayName: 'Microsoft Outlook365',
    channel: ChannelTypeEnum.EMAIL,
    credentials: outlook365Config,
    docReference: 'https://docs.novu.co/channels/email/outlook365',
    logoFileName: { light: 'outlook365.png', dark: 'outlook365.png' },
  },
  {
    id: EmailProviderIdEnum.Infobip,
    displayName: 'Infobip',
    channel: ChannelTypeEnum.EMAIL,
    credentials: infobipEmailConfig,
    docReference: 'https://docs.novu.co/channels/email/infobip',
    logoFileName: { light: 'infobip.png', dark: 'infobip.png' },
  },
  {
    id: EmailProviderIdEnum.Resend,
    displayName: 'Resend',
    channel: ChannelTypeEnum.EMAIL,
    credentials: resendConfig,
    docReference: 'https://docs.novu.co/channels/email/resend',
    logoFileName: { light: 'resend.svg', dark: 'resend.svg' },
  },
  {
    id: EmailProviderIdEnum.SparkPost,
    displayName: 'SparkPost',
    channel: ChannelTypeEnum.EMAIL,
    credentials: sparkpostConfig,
    docReference: 'https://docs.novu.co/channels/email/sparkpost',
    logoFileName: { light: 'sparkpost.svg', dark: 'sparkpost.svg' },
  },
  {
    id: EmailProviderIdEnum.EmailWebhook,
    displayName: 'Email Webhook',
    channel: ChannelTypeEnum.EMAIL,
    credentials: emailWebhookConfig,
    betaVersion: true,
    docReference: 'https://docs.novu.co/channels/email/email-webhook/',
    logoFileName: { light: 'email_webhook.svg', dark: 'email_webhook.svg' },
  },
];
