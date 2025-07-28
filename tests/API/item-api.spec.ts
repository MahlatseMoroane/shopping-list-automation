import { test, expect, request } from '@playwright/test';
import { ApiUtil } from '../../Utils/apiUtils';

const BASE = 'http://localhost:5000';
let apiUtil:ApiUtil;
test.describe('API Tests', () => {


  test.beforeEach(async ({ page }) => {
    apiUtil = new ApiUtil(BASE);
  });

  test('Login success', async ({ request }) => {
    const res = await apiUtil.apiRequest(request, 'post', '/login', { username: 'demo', password: '1234' });
    expect(res.status()).toBe(200);
  });

  test('Login fail incorrect password', async ({ request }) => {
    const res = await apiUtil.apiRequest(request, 'post', '/login', { username: 'demo', password: '4321' });
    expect(res.status()).toBe(401);
  });

  test('Login fail incorrect username', async ({ request }) => {
    const res = await apiUtil.apiRequest(request, 'post', '/login', { username: 'dema@', password: '4321' });
    expect(res.status()).toBe(401);
  });

  let createdItemId: string | number | undefined;

  test('validate Add item', async ({ request }) => {
    const addRes = await apiUtil.apiRequest(request, 'post', '/items', { name: 'Kiwi' });
    console.log('Add response:', await addRes.text());
    expect(addRes.status()).toBe(201);
    const added = await addRes.json();
    expect(added.name).toBe('Kiwi');
    createdItemId = added.id;
    const delRes = await apiUtil.apiRequest(request, 'delete', `/items/${createdItemId}`);
    expect(delRes.status()).toBe(204);
  });


  test('validate Read items', async ({ request }) => {
    const addRes = await apiUtil.apiRequest(request, 'post', '/items', { name: 'Kiwi' });
    expect(addRes.status()).toBe(201);
    const getRes = await apiUtil.apiRequest(request, 'get', '/items');
    expect(getRes.status()).toBe(200);
    const items = await getRes.json();
    console.log('get response:', items);
    // Optionally check if 'Kiwi' exists in the list
    expect(items.some(item => item.name === 'Kiwi')).toBeTruthy();
    const added = await addRes.json();
    createdItemId = added.id;
    const delRes = await apiUtil.apiRequest(request, 'delete', `/items/${createdItemId}`);
    expect(delRes.status()).toBe(204);
  });

  test('validate  Update item', async ({ request }) => {
    // If createdItemId is not set, add the item first
      const addRes = await apiUtil.apiRequest(request, 'post', '/items', { name: 'Kiwi' });
      const added = await addRes.json();
      createdItemId = added.id;
    const updateRes = await apiUtil.apiRequest(request, 'put', `/items/${createdItemId}`, { name: 'Lemon' });
    expect(updateRes.status()).toBe(200);
    const updated = await updateRes.json();
    console.log('update response:', updated);
    expect(updated.name).toBe('Lemon');
    const delRes = await apiUtil.apiRequest(request, 'delete', `/items/${createdItemId}`);
    expect(delRes.status()).toBe(204);
  });

  test('validate Delete item', async ({ request }) => {
    // If createdItemId is not set, add the item first
      const addRes = await apiUtil.apiRequest(request, 'post', '/items', { name: 'Kiwi' });
      const added = await addRes.json();
      createdItemId = added.id;
    const delRes = await apiUtil.apiRequest(request, 'delete', `/items/${createdItemId}`);
    expect(delRes.status()).toBe(204);
    console.log('del response:', await delRes.text());
  });

  test('validate Add incorrect item with special characters error message', async ({ request }) => {
    const addRes = await apiUtil.apiRequest(request, 'post', '/items', { name: 'Kiwi@' });
    console.log('Add response:', await addRes.text());
    expect(addRes.status()).toBe(400);
    const added = await addRes.json();
    expect(added.message).toBe('Item name contains invalid characters');
    createdItemId = added.id;
  });

  test('validate Add an empty value error message', async ({ request }) => {
    const addRes = await apiUtil.apiRequest(request, 'post', '/items', { name: '' });
    console.log('Add response:', await addRes.text());
    expect(addRes.status()).toBe(400);
    const added = await addRes.json();
    expect(added.message).toBe('Item name cannot be empty');
    createdItemId = added.id;
  });

});
