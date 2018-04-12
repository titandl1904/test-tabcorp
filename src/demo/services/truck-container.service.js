class TruckContainerService {

	constructor($http) {
        'ngInject';
        
        this.defaultContainer = [
            {
                id: '1',
                currentLiter: 400,
                maxLiter: 400,
                degree: 4,
                typeOfDegree: 'C'
            },
            {
                id: '2',
                currentLiter: 450,
                maxLiter: 450,
                degree: 5,
                typeOfDegree: 'C'
            },
            {
                id: '3',
                currentLiter: 300,
                maxLiter: 300,
                degree: 6,
                typeOfDegree: 'C'
            }
        ];

        this.listStatus = {
            'inloading': {
                id: 'inloading',
                text: 'In Loading'
            },
            'indriving': {
                id: 'indriving',
                text: 'In Driving'
            },
            'reload': {
                id: 'reload',
                text: 'Reload'
            },
            'onhold': {
                id: 'onhold',
                text: 'On Hold'
            },
            'inholding': {
                id: 'inholding',
                text: 'Continue'
            },
            'completed': {
                id: 'completed',
                text: 'Completed'
            }
        };
    }

    listStatusOfTruck() {
        return this.listStatus;
    }

    setupDefaultTruckContainer() {
        const truckContainer = localStorage.getItem('truckContainer');

        if (angular.isUndefined(truckContainer) || truckContainer === null) {
            localStorage.setItem('truckContainer', JSON.stringify(this.defaultContainer));
        }
    }

    getCurrentStatusTruck() {
        let data = localStorage.getItem('currentStatus');
        if (angular.isDefined(data) && angular.isObject(this.listStatus[data])) {
            return this.listStatus[data];
        } else {
            this.setStatusTruck('inloading');
            return this.listStatus['inloading'];
        }
    }

    setStatusTruck(status) {
        localStorage.setItem('currentStatus', status);
    }

    getPreviousDangerLevel() {
        let dataDriving = JSON.parse(localStorage.getItem('dataDriving'));

        return dataDriving.isPreviousDangerLevel;
    }

    setDataWhenDriving(listTypeOfBear, listContainer, isDanger) {
        localStorage.setItem('dataDriving', JSON.stringify({listTypeOfBear, listContainer, isPreviousDangerLevel: isDanger}));
    }

    deleteData() {
        localStorage.removeItem('dataDriving');
        this.setStatusTruck('inloading');
    }

    getTruckContainer() {
        if (this.getCurrentStatusTruck().id !== 'inloading') {
            let dataDriving = JSON.parse(localStorage.getItem('dataDriving'));
            dataDriving = dataDriving.listContainer;
            return dataDriving;
        }
        this.setupDefaultTruckContainer();
        let data = localStorage.getItem('truckContainer');
        try {
            // make sure data not break UI when parse wrong data
            data = JSON.parse(data);
        } catch (error) {
            // setup data again when data is wrong
            localStorage.removeItem('truckContainer');
            this.getTruckContainer();
        }
        return data;
    }
}

export default TruckContainerService;