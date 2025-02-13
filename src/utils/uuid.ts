import {v4 as uuidv4} from 'uuid';

export function generateTranssactionId(): string {
  return uuidv4();
}