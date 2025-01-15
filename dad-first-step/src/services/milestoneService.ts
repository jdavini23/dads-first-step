import { 
  addDoc, 
  collection, 
  doc, 
  getDocs, 
  query, 
  updateDoc, 
  where, 
  serverTimestamp, 
  FirestoreError,
  deleteDoc
} from 'firebase/firestore'
import { firebaseService } from '@/lib/firebaseApp'
import { UserMilestone, MilestoneCategory, MilestoneDifficulty } from '@/types/milestone'

const MILESTONES_COLLECTION = 'userMilestones'
const MAX_RETRIES = 3
const RETRY_DELAY = 1000

// Enhanced error handling for Firestore operations
const handleFirestoreError = (error: FirestoreError) => {
  switch (error.code) {
    case 'permission-denied':
      throw new Error('Access denied. Please check your permissions.')
    case 'unavailable':
      throw new Error('Service temporarily unavailable. Please try again later.')
    case 'unauthenticated':
      throw new Error('Authentication required. Please sign in.')
    default:
      throw new Error(`Database error: ${error.message}`)
  }
}

export const getMilestonesForUser = async (userId: string): Promise<UserMilestone[]> => {
  let retries = MAX_RETRIES
  
  while (retries > 0) {
    try {
      const { db } = firebaseService
      
      if (!db) {
        throw new Error('Database not initialized')
      }

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
      retries--
      
      if (error instanceof FirestoreError) {
        handleFirestoreError(error)
      }
      
      if (retries === 0) {
        console.error('Failed to fetch milestones after max retries:', error)
        throw error
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
    }
  }
  
  throw new Error('Failed to fetch milestones')
}

export const addUserMilestone = async (milestone: Omit<UserMilestone, 'id'>): Promise<string> => {
  try {
    const { db } = firebaseService
    const docRef = await addDoc(collection(db, MILESTONES_COLLECTION), {
      ...milestone,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return docRef.id
  } catch (error) {
    if (error instanceof FirestoreError) {
      handleFirestoreError(error)
    }
    throw error
  }
}

export const updateUserMilestone = async (
  milestoneId: string, 
  updates: Partial<UserMilestone>
): Promise<void> => {
  try {
    const { db } = firebaseService
    const docRef = doc(db, MILESTONES_COLLECTION, milestoneId)
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    })
  } catch (error) {
    if (error instanceof FirestoreError) {
      handleFirestoreError(error)
    }
    throw error
  }
}

export const deleteUserMilestone = async (milestoneId: string): Promise<void> => {
  try {
    const { db } = firebaseService
    const docRef = doc(db, MILESTONES_COLLECTION, milestoneId)
    await deleteDoc(docRef)
  } catch (error) {
    if (error instanceof FirestoreError) {
      handleFirestoreError(error)
    }
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
    difficulty: MilestoneDifficulty.EASY,
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
    difficulty: MilestoneDifficulty.MODERATE,
    skills: ['Motor Skills', 'Balance', 'Coordination'],
    completed: false,
    progress: 0,
    resources: [
      'https://www.cdc.gov/ncbddd/childdevelopment/facts.html'
    ]
  }
]
