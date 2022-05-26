interface Params {
  key: string;
  value: string;
}

interface SearchParams {
  append: (args: Params) => void;
  set: (args: Params) => void;
  remove: (args: Params) => void;
  removeAll: (args: { key: string }) => void;
  get: (args: { key: string; search?: string }) => string | null;
  getAll: (args: { key: string }) => string[];
  has: (args: { key: string }) => boolean;
}

export const searchParams = (): SearchParams => {
  const append = ({ key, value }: Params, state = {}) => {
    const url = new URL(location.toString());
    if (url.search.toString().includes(`${key}=${value}`)) return;

    const valuesAppend = [value];
    const valuesCurrent = url.searchParams.getAll(key);
    const valuesUnique = new Set([...valuesAppend, ...valuesCurrent]);

    url.searchParams.delete(key);
    [...valuesUnique].map((value) => {
      url.searchParams.append(key, value);
    });
    history.pushState(state, "", url.toString());
  };

  const set = ({ key, value }: Params, state = {}) => {
    const url = new URL(location.toString());
    if (url.search.toString().includes(`${key}=${value}`)) return;

    url.searchParams.set(key, value);
    history.pushState(state, "", url.toString());
  };

  const remove = ({ key, value }: Params, state = {}) => {
    const url = new URL(location.toString());
    if (!url.search.toString().includes(`${key}=${value}`)) return;

    const params = new URLSearchParams(location.search);
    const filtered = params.getAll(key).filter((v) => v !== value);

    url.searchParams.delete(key);
    filtered.map((value) => {
      url.searchParams.append(key, value);
    });
    history.pushState(state, "", url.toString());
  };

  const removeAll = ({ key }: { key: string }, state = {}) => {
    const url = new URL(location.toString());
    url.searchParams.delete(key);
    history.pushState(state, "", url.toString());
  };

  const get = ({ key, search }: { key: string; search?: string }) => {
    const params = new URLSearchParams(search || location.search);
    return params.get(key);
  };

  const getAll = ({ key }: { key: string }) => {
    const params = new URLSearchParams(location.search);
    return params.getAll(key);
  };

  const has = ({ key }: { key: string }) => {
    const params = new URLSearchParams(location.search);
    return params.has(key);
  };

  return {
    append,
    set,
    remove,
    removeAll,
    get,
    getAll,
    has,
  };
};
