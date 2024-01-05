import type DataAccessor from '@/service/database/base/interface';
import type Session from '@/service/database/session/model';

class SessionClient implements DataAccessor<Session> {
  async find(id: string): Promise<Session | null> {
    try {
      const response = await fetch(`/api/service/database/session?id=${id}`);
      if (response.ok) {
        const data = await response.json();
        return data.session;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching session:', error);
      return null;
    }
  }

  async insert(item: Session): Promise<string | null> {
    try {
      const response = await fetch(`/api/service/database/session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (response.ok) {
        const data = await response.json();
        return data.sessionId;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error creating session:', error);
      return null;
    }
  }

  async update(item: Session): Promise<boolean> {
    try {
      const response = await fetch(`/api/service/database/session`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      return response.ok;
    } catch (error) {
      console.error('Error updating session:', error);
      return false;
    }
  }
}

export default SessionClient;
