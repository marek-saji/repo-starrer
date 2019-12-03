class Storage
{
    async getItem (name)
    {
        return global.localStorage.getItem(name);
    }

    async setItem (name, value)
    {
        global.localStorage.setItem(name, value);
    }
}

export default new Storage();
