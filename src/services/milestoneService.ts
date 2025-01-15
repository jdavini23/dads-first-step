import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { firebaseService } from '@/lib/firebaseApp';
import {
  UserMilestone,
  MilestoneCategory,
  MilestoneDifficulty,
  Milestone,
} from '@/types/milestone';

const { db } = firebaseService;

export const MILESTONES_COLLECTION = 'milestones';

export const getMilestonesForUser = async (userId: string): Promise<UserMilestone[]> => {
  try {
    const milestoneRef = collection(db, MILESTONES_COLLECTION);
    const q = query(milestoneRef, where('userId', '==', userId));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('No milestones found for user');
      return [];
    }

    const milestones = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as UserMilestone
    );

    return milestones;
  } catch (error) {
    console.error('Error fetching milestones:', error);
    throw error;
  }
};

export const addUserMilestone = async (milestone: Milestone): Promise<UserMilestone> => {
  try {
    const milestoneRef = collection(db, MILESTONES_COLLECTION);

    const userMilestone: Omit<UserMilestone, 'id'> = {
      ...milestone,
      userId: firebaseService.auth.currentUser?.uid || '', // Ensure userId is set
      completed: false,
      progress: 0,
      completedAt: null, // Change undefined to null
      notes: '',
      createdAt: '',
      updatedAt: ''
    };

    const docRef = await addDoc(milestoneRef, userMilestone);

    return {
      ...userMilestone,
      id: docRef.id,
    };
  } catch (error) {
    console.error('Error adding milestone:', error);
    throw error;
  }
};

export const updateUserMilestone = async (
  milestoneId: string,
  updates: Partial<UserMilestone>
): Promise<void> => {
  try {
    const milestoneRef = doc(db, MILESTONES_COLLECTION, milestoneId);
    await updateDoc(milestoneRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating milestone:', error);
    throw error;
  }
};

export const deleteUserMilestone = async (milestoneId: string): Promise<void> => {
  try {
    const milestoneRef = doc(db, MILESTONES_COLLECTION, milestoneId);
    await deleteDoc(milestoneRef);
  } catch (error) {
    console.error('Error deleting milestone:', error);
    throw error;
  }
};

// Predefined milestone templates
export const getMilestoneTemplates = (): UserMilestone[] => [
  {
    id: 'template-1',
    userId: '', // Will be set when added
    title: 'First Smile',
    description: "Your baby's first social smile",
    category: MilestoneCategory.SOCIAL,
    minAge: 6,
    maxAge: 12,
    difficulty: MilestoneDifficulty.EASY,
    skills: ['Social Interaction', 'Emotional Recognition'],
    completed: false,
    progress: 0,
    resources: [
      'https://www.healthychildren.org/English/ages-stages/baby/Pages/Developmental-Milestones.aspx',
    ],
    createdAt: '',
    updatedAt: ''
  },
  {
    id: 'template-2',
    userId: '', // Will be set when added
    title: 'First Steps',
    description: 'Taking first independent steps',
    category: MilestoneCategory.PHYSICAL,
    minAge: 9,
    maxAge: 18,
    difficulty: MilestoneDifficulty.MEDIUM,
    skills: ['Motor Skills', 'Balance', 'Coordination'],
    completed: false,
    progress: 0,
    resources: ['https://www.cdc.gov/ncbddd/childdevelopment/facts.html'],
    createdAt: '',
    updatedAt: ''
  },
];

// Add default milestones for a user with comprehensive error handling
export const addDefaultMilestones = async (userId: string): Promise<string[]> => {
  // Validate input
  if (!userId) {
    throw new Error('User ID is required to add default milestones');
  }

  // Predefined milestone templates to add
  const defaultMilestones: Omit<UserMilestone, 'id'>[] = [
    {
      userId, // Set user ID directly
      title: 'First Smile',
      description: "Your baby's first social smile",
      category: MilestoneCategory.SOCIAL,
      minAge: 6,
      maxAge: 12,
      difficulty: MilestoneDifficulty.EASY,
      skills: ['Social Interaction', 'Emotional Recognition'],
      completed: false,
      progress: 0,
      resources: [
        'https://www.healthychildren.org/English/ages-stages/baby/Pages/Developmental-Milestones.aspx',
      ],
      createdAt: '',
      updatedAt: ''
    },
    {
      userId, // Set user ID directly
      title: 'First Steps',
      description: 'Taking first independent steps',
      category: MilestoneCategory.PHYSICAL,
      minAge: 9,
      maxAge: 18,
      difficulty: MilestoneDifficulty.MEDIUM,
      skills: ['Motor Skills', 'Balance', 'Coordination'],
      completed: false,
      progress: 0,
      resources: ['https://www.cdc.gov/ncbddd/childdevelopment/facts.html'],
      createdAt: '',
      updatedAt: ''
    },
  ];

  try {
    // Ensure Firestore is initialized
    if (!db) {
      throw new Error('Firestore database is not initialized');
    }

    // Validate Firestore collection name
    if (!MILESTONES_COLLECTION) {
      throw new Error('Milestones collection name is not defined');
    }

    // Prepare batch write for better performance and atomicity
    const milestonePromises = defaultMilestones.map(async (milestone) => {
      try {
        // Validate milestone data before sending
        const validatedMilestone = {
          ...milestone,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        // Log the milestone being added for debugging
        console.log('Adding milestone:', JSON.stringify(validatedMilestone, null, 2));

        // Add milestone directly
        const docRef = await addDoc(collection(db, MILESTONES_COLLECTION), validatedMilestone);

        return docRef.id;
      } catch (addError) {
        console.error('Failed to add individual milestone:', addError);

        // Log the specific error details
        if (addError instanceof Error) {
          console.error('Error name:', addError.name);
          console.error('Error message:', addError.message);
        }

        throw addError;
      }
    });

    // Wait for all milestones to be added
    const milestoneIds = await Promise.all(milestonePromises);

    // Log successful milestone addition
    console.log(`Added ${milestoneIds.length} default milestones for user ${userId}`);

    return milestoneIds;
  } catch (error) {
    // Comprehensive error handling
    console.error('Error adding default milestones:', error);

    // Distinguish between different error types
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }

    // Rethrow with a user-friendly message
    throw new Error(
      'Failed to add default milestones. Please check your connection and try again.'
    );
  }
};
