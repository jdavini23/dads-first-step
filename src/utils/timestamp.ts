/**
 * Comprehensive timestamp utility for consistent date handling
 */
export class Timestamp {
  /**
   * Get current timestamp in ISO format
   * @returns Current timestamp as ISO string
   */
  static now(): string {
    return new Date().toISOString();
  }

  /**
   * Format a timestamp to a human-readable string
   * @param timestamp - ISO timestamp to format
   * @param format - Formatting option
   * @returns Formatted timestamp string
   */
  static format(timestamp: string, format: 'short' | 'long' | 'relative' = 'short'): string {
    const date = new Date(timestamp);

    switch (format) {
      case 'short':
        return date.toLocaleDateString();
      case 'long':
        return date.toLocaleString();
      case 'relative':
        return this.getRelativeTime(date);
    }
  }

  /**
   * Calculate relative time from a given timestamp
   * @param date - Date to calculate relative time for
   * @returns Relative time string
   */
  private static getRelativeTime(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const units = [
      { name: 'year', seconds: 31536000 },
      { name: 'month', seconds: 2592000 },
      { name: 'week', seconds: 604800 },
      { name: 'day', seconds: 86400 },
      { name: 'hour', seconds: 3600 },
      { name: 'minute', seconds: 60 },
      { name: 'second', seconds: 1 },
    ];

    for (const unit of units) {
      const interval = Math.floor(diffInSeconds / unit.seconds);
      if (interval >= 1) {
        return interval === 1 ? `1 ${unit.name} ago` : `${interval} ${unit.name}s ago`;
      }
    }

    return 'just now';
  }

  /**
   * Check if a timestamp is valid
   * @param timestamp - Timestamp to validate
   * @returns Boolean indicating timestamp validity
   */
  static isValid(timestamp: string): boolean {
    return !isNaN(Date.parse(timestamp));
  }

  /**
   * Compare two timestamps
   * @param timestamp1 - First timestamp
   * @param timestamp2 - Second timestamp
   * @returns Negative if timestamp1 is earlier, positive if later, 0 if equal
   */
  static compare(timestamp1: string, timestamp2: string): number {
    return new Date(timestamp1).getTime() - new Date(timestamp2).getTime();
  }
}
