import { supabase } from '../lib/supabase.js';
import { HttpError } from '../utils/httpError.js';

// DB ke snake_case ko API ke camelCase me badalna
const toApi = (r) => ({
  id: r.id,
  title: r.title,
  description: r.description,
  done: r.done,
  dueDate: r.due_date,
  createdAt: r.created_at,
});

export async function listTasks(userId) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data.map(toApi);
}

export async function createTask(userId, input) {
  const { data, error } = await supabase
    .from('tasks')
    .insert({
      user_id: userId,
      title: input.title,
      description: input.description ?? null,
      due_date: input.dueDate ?? null,
    })
    .select()
    .single();
  if (error) throw error;
  return toApi(data);
}

export async function updateTask(userId, id, input) {
  const patch = {};
  if (input.title !== undefined) patch.title = input.title;
  if (input.description !== undefined) patch.description = input.description;
  if (input.dueDate !== undefined) patch.due_date = input.dueDate;
  if (input.done !== undefined) patch.done = input.done;
  if (Object.keys(patch).length === 0) throw new HttpError(400, 'Update karne ke liye kuch to bhejo');

  const { data, error } = await supabase
    .from('tasks')
    .update(patch)
    .eq('id', id)
    .eq('user_id', userId) // sirf apna hi task badal sakte ho
    .select()
    .maybeSingle();
  if (error) throw error;
  if (!data) throw new HttpError(404, 'Task nahi mila');
  return toApi(data);
}

export async function deleteTask(userId, id) {
  const { data, error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)
    .select('id')
    .maybeSingle();
  if (error) throw error;
  if (!data) throw new HttpError(404, 'Task nahi mila');
}
