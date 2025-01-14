import { 
  collection, 
  query, 
  where, 
  getDocs, 
  updateDoc, 
  doc, 
  addDoc,
  deleteDoc
} from 'firebase/firestore'
import { db } from '../../firebase'
import { UserMilestone, MilestoneCategory } from '@/types/milestone'

const MILESTONES_COLLECTION = 'userMilestones'

export const getMilestonesForUser = async (userId: string): Promise<UserMilestone[]> => {
  try {
    const q = query(
      collection(db, MILESTONES_COLLECTION), 
      where('userId', '==', userId)
    )
    
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as UserMilestone))
  } catch (error) {
    console.error('Error fetching milestones:', error)
    throw error
  }
}

export const addUserMilestone = async (milestone: UserMilestone): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, MILESTONES_COLLECTION), milestone)
    return docRef.id
  } catch (error) {
    console.error('Error adding milestone:', error)
    throw error
  }
}

export const updateUserMilestone = async (
  milestoneId: string, 
  updates: Partial<UserMilestone>
): Promise<void> => {
  try {
    const milestoneRef = doc(db, MILESTONES_COLLECTION, milestoneId)
    await updateDoc(milestoneRef, updates)
  } catch (error) {
    console.error('Error updating milestone:', error)
    throw error
  }
}

export const deleteUserMilestone = async (milestoneId: string): Promise<void> => {
  try {
    const milestoneRef = doc(db, MILESTONES_COLLECTION, milestoneId)
    await deleteDoc(milestoneRef)
  } catch (error) {
    console.error('Error deleting milestone:', error)
    throw error
  }
}

// Predefined milestone templates
export const getMilestoneTemplates = (): UserMilestone[] => [
  {
    id: 'template-1',
    userId: '', // Will be set when added
    title: 'First Smile',
    description: 'Your baby\'s first social smile',
    category: MilestoneCategory.SOCIAL,
    minAge: 6,
    maxAge: 12,
    difficulty: 'easy',
    skills: ['Social Interaction', 'Emotional Recognition'],
    completed: false,
    progress: 0,
    resources: [
      'https://www.healthychildren.org/English/ages-stages/baby/Pages/Developmental-Milestones.aspx'
    ]
  },
  {
    id: 'template-2',
    userId: '', // Will be set when added
    title: 'First Steps',
    description: 'Taking first independent steps',
    category: MilestoneCategory.PHYSICAL,
    minAge: 9,
    maxAge: 18,
    difficulty: 'moderate',
    skills: ['Motor Skills', 'Balance', 'Coordination'],
    completed: false,
    progress: 0,
    resources: [
      'https://www.cdc.gov/ncbddd/childdevelopment/facts.html'
    ]
  }
]
