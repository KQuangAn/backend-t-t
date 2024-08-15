export interface IUrl {
    url: string;
    priority: number;

}

export interface IUrlReachable extends IUrl {
    reachable: boolean;
}

