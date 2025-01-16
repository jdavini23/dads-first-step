import React, { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import { useMilestoneStore } from '@/stores/milestoneStore';
import { useUserStore } from '@/stores/userStore';
import { MilestoneType, MilestoneDifficulty, UserMilestone, MilestoneCategory } from '@/types/milestone';

interface MilestoneDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MilestoneDialog: React.FC<MilestoneDialogProps> = ({ isOpen, onClose }) => {
  const { addMilestone } = useMilestoneStore();
  const { _user } = useUserStore();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<MilestoneType>('COGNITIVE' as MilestoneType);
  const [difficulty, setDifficulty] = useState<MilestoneDifficulty>('MEDIUM' as MilestoneDifficulty);
  const [date, setDate] = useState<Date>(new Date());
  const [category, setCategory] = useState<MilestoneCategory>('CUSTOM' as MilestoneCategory);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newMilestone: UserMilestone = {
      id: crypto.randomUUID(), // Generate a unique ID
      userId: _user?.id || '', // Add userId from global _user
      title,
      description,
      type,
      difficulty,
      date,
      completed: false,
      category
    };

    addMilestone(newMilestone);
    onClose();
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTitle('');
    setDescription('');
    setType('COGNITIVE' as MilestoneType);
    setDifficulty('MEDIUM' as MilestoneDifficulty);
    setDate(new Date());
    setCategory('CUSTOM' as MilestoneCategory);
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <Label>Milestone Title</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter milestone title"
              required
            />
          </div>

          <div>
            <Label>Description</Label>
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the milestone"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Type</Label>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value as MilestoneType)}
              >
                <option value="COGNITIVE">Cognitive</option>
                <option value="PHYSICAL">Physical</option>
                <option value="SOCIAL">Social</option>
                <option value="EMOTIONAL">Emotional</option>
              </Select>
            </div>

            <div>
              <Label>Difficulty</Label>
              <Select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as MilestoneDifficulty)}
              >
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </Select>
            </div>
          </div>

          <div>
            <Label>Date</Label>
            <Input
              type="date"
              value={date.toISOString().split('T')[0]}
              onChange={(e) => setDate(new Date(e.target.value))}
            />
          </div>

          <div className="flex justify-between">
            <Button type="submit" variant="default">
              Add Milestone
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      </form>
    </Dialog>
  );
};
