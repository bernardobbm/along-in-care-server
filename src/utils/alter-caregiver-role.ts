import { prisma } from '../lib/prisma'

export async function alterCaregiverRole(
  caregiverId: string,
  command: 'REMOVE' | 'ADD',
) {
  if (command === 'ADD') {
    return await prisma.caregiver.update({
      where: {
        id: caregiverId,
      },
      data: {
        role: 'PRIMARY',
      },
    })
  }

  if (command === 'REMOVE') {
    return await prisma.caregiver.update({
      where: {
        id: caregiverId,
      },
      data: {
        role: 'ASSISTANT',
      },
    })
  }
}
