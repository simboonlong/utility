interface Params {
  key: string;
  value: string;
}

interface SearchParams {
  update: (args: Params) => void;
  remove: (args: Params) => void;
  removeAll: (args: { key: string }) => void;
}

export const searchParams = (): SearchParams => {
  const url = new URL(location.toString());

  const update = ({ key, value }: Params, state = {}) => {
    if (url.search.toString().includes(`${key}=${value}`)) return;

    const valuesUpdate = [value];
    const valuesCurrent = url.searchParams.getAll(key);
    const valuesUnique = new Set([...valuesUpdate, ...valuesCurrent]);

    url.searchParams.delete(key);
    [...valuesUnique].map((value) => {
      url.searchParams.append(key, value);
    });
    history.pushState(state, "", url.toString());
  };

  const remove = ({ key, value }: Params, state = {}) => {
    if (!url.search.toString().includes(`${key}=${value}`)) return;

    const params = new URLSearchParams(url.searchParams.toString());
    const filtered = params.getAll(key).filter((v) => v !== value);

    url.searchParams.delete(key);
    filtered.map((value) => {
      url.searchParams.append(key, value);
    });
    history.pushState(state, "", url.toString());
  };

  const removeAll = ({ key }: { key: string }, state = {}) => {
    url.searchParams.delete(key);
    history.pushState(state, "", url.toString());
  };

  return {
    update,
    remove,
    removeAll,
  };
};
