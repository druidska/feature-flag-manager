class FeatureFlagManager {
    constructor(storagePath) {
        const fs = require('fs');
        if (!fs.existsSync(storagePath)) {
            fs.writeFileSync(storagePath, JSON.stringify({}));
        }
        this.storagePath = storagePath;
        this.flags = JSON.parse(fs.readFileSync(storagePath, 'utf8'));
    }

    isEnabled(flagName) {
        return !!this.flags[flagName];
    }

    enableFlag(flagName) {
        this.flags[flagName] = true;
        this._persist();
    }

    disableFlag(flagName) {
        this.flags[flagName] = false;
        this._persist();
    }

    _persist() {
        const fs = require('fs');
        fs.writeFileSync(this.storagePath, JSON.stringify(this.flags, null, 2));
    }
}

module.exports = FeatureFlagManager;