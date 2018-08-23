const Event = use('Event')
const Mail = use('Mail')
const Encryption = use('Encryption')

Event.on('user::created', async ({ user }) => {
  const { token } = await user.tokens().where('user_id', user.uuid).first()
  const base = Encryption.encrypt(token)
  await Mail.send('emails.welcome', { user, token: base, link: 'http://127.0.0.1:3334' }, message => {
    message.to(user.email).from('link14030@gmail.com', 'Bienvenue !').subject('Welcome To My Forum !')
  })
})
