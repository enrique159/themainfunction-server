import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        username: 'kikazoBalazo159',
        fullName: 'Enrique Marin Hirales',
        email: 'enrique@mail.com',
        password: '12345678',
        profileAvatar: 'https://i.pravatar.cc/150',
        bio: 'I am a software engineer',
        location: 'La Paz, Baja California Sur',
        company: 'Kikazo',
        country: 'Mexico',
        githubLink: 'https://github.com/enrique159',
        website: 'https://enriquemarin.xyz',
      },
    ])
  }
}
