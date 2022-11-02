interface PostParams {
  key: string;
  value: string;
}

interface GetParams {
  key: string;
  search?: string;
}

interface DeleteParams {
  key: string;
}

interface SearchParams {
  append: (args: PostParams) => void;
  set: (args: PostParams) => void;
  remove: (args: PostParams) => void;
  removeAll: (args: DeleteParams) => void;
  get: (args: GetParams) => string | null;
  getAll: (args: GetParams) => string[];
  has: (args: GetParams) => boolean;
}

export const searchParams = (): SearchParams => {
  const append = ({ key, value }: PostParams, state = {}) => {
    const url = new URL(location.toString());
    if (url.search.toString().includes(`${key}=${value}`)) return;

    const valuesAppend = [value];
    const valuesCurrent = url.searchParams.getAll(key);
    const valuesUnique = new Set([...valuesAppend, ...valuesCurrent]);

    url.searchParams.delete(key);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    [...valuesUnique].map((value) => {
      url.searchParams.append(key, value);
    });
    history.pushState(state, "", url.toString());
  };

  const set = ({ key, value }: PostParams, state = {}) => {
    const url = new URL(location.toString());
    if (url.search.toString().includes(`${key}=${value}`)) return;

    url.searchParams.set(key, value);
    history.pushState(state, "", url.toString());
  };

  const remove = ({ key, value }: PostParams, state = {}) => {
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

  const removeAll = ({ key }: DeleteParams, state = {}) => {
    const url = new URL(location.toString());
    url.searchParams.delete(key);
    history.pushState(state, "", url.toString());
  };

  const get = ({ key, search }: GetParams) => {
    const params = new URLSearchParams(search || location.search);
    return params.get(key);
  };

  const getAll = ({ key, search }: GetParams) => {
    const params = new URLSearchParams(search || location.search);
    return params.getAll(key);
  };

  const has = ({ key, search }: GetParams) => {
    const params = new URLSearchParams(search || location.search);
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
