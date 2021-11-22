import LocalStorageModel from '../models/local-storage-model';

class SettingsController{
    settingsContainer = document.querySelector('.settings__form');
    saveStatInp = this.settingsContainer.querySelector('#save-stat');
    volumeRange = this.settingsContainer.querySelector('#volume');
    btnSoundOff = this.settingsContainer.querySelector('.btn-sound--off');
    btnSoundOn = this.settingsContainer.querySelector('.btn-sound--on');
    timer = this.settingsContainer.querySelector('#timer');
    timeInp = this.settingsContainer.querySelector('#time');
    saveBtn = this.settingsContainer.querySelector('.btn-text--save');
    resetBtn = this.settingsContainer.querySelector('.btn-text--reset');

    constructor() {
        this.lsModel = new LocalStorageModel();
        this.userName = localStorage.currentUser;
        this.isSaveStat = true;
        this.isSound = true;
        this.volume = 75;
        this.isTimer = true;
        this.time = 20;
    }

    start = () => {       
        const savedSettings = this.lsModel.getLScategories(this.userName);
        if (savedSettings) {
            if (typeof(savedSettings.isSaveStat) == Boolean) {
                this.isSaveStat = savedSettings.isSaveStat;                
            }
            if (typeof(savedSettings.isSound) == Boolean) {
                this.isSound = savedSettings.isSound;                
            }
            if (savedSettings.volume) {
                this.volume = savedSettings.volume;
            }
            if (typeof(savedSettings.isTimer) == Boolean) {
                this.isTimer = savedSettings.isTimer;
            }
            if (savedSettings.time) {
                this.time = savedSettings.time;
            }
        }

        this.renderForm();
        

        this.saveBtn.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.isSaveStat = this.saveStatInp.checked;
            if (this.btnSoundOff.classList.contains('active')) {
                this.isSound = false;
            } else if (this.btnSoundOn.classList.contains('active')) {
                this.isSound = true;
            }
            this.volume = this.volumeRange.value;
            this.isTimer = this.timer.checked;
            this.time = this.timeInp.value;

            this.saveSettingsToLs();
        })

        this.resetBtn.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.isSaveStat = true;
            this.isSound = true;
            this.volume = 75;
            this.isTimer = true;
            this.time = 20;
            this.saveSettingsToLs();
            this.renderForm();
        })

        this.btnSoundOff.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.btnSoundOn.classList.remove('active');
            this.btnSoundOff.classList.add('active');
        })

        this.btnSoundOn.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.btnSoundOn.classList.add('active');
            this.btnSoundOff.classList.remove('active');
        })
    }
    
    saveSettingsToLs = () => {
        this.lsModel.setLSsettings('isSaveStat', this.isSaveStat, this.userName);
        this.lsModel.setLSsettings('isSound', this.isSound, this.userName);
        this.lsModel.setLSsettings('volume', this.volume, this.userName);
        this.lsModel.setLSsettings('isTimer', this.isTimer, this.userName);
        this.lsModel.setLSsettings('time', this.time, this.userName);
    }

    renderForm = () => {
        this.saveStatInp.checked = this.isSaveStat;
        if (this.isSound) {
            this.btnSoundOn.classList.add('active');
            this.btnSoundOff.classList.remove('active');
        } else {
            this.btnSoundOn.classList.remove('active');
            this.btnSoundOff.classList.add('active');
        }
        this.volumeRange.value = this.volume;
        this.timer.checked = this.isTimer;
        this.timeInp.value = this.time;
    }

}

export default SettingsController;