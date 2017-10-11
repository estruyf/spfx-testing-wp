import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";
import MockHttpClient from "./MockHttpClient";
import { ISPList, ISPLists } from "../IHelloWorldWebPartProps";

export interface IHelloWorldState {
  results: ISPLists;
}

export default class HelloWorld extends React.Component<IHelloWorldProps, IHelloWorldState> {
  constructor(props: IHelloWorldProps) {
    super(props);

    this.state = {
      results: null
    };
  }

  public componentDidMount(): void {
    this._renderListAsync();
  }

  private _renderListAsync(): void {
    if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
      // Not implemented ...
    } else {
      // Local, other environment
      this._getMockListData().then((response) => {
        this.setState({
          results: response
        });
      });
    }
  }

  private _getMockListData(): Promise<ISPLists> {
    return MockHttpClient.get()
      .then((data: ISPList[]) => {
        const listData: ISPLists = { value: data };
        return listData;
      }) as Promise<ISPLists>;
  }

  public render(): React.ReactElement<IHelloWorldProps> {
    return (
      <div className={styles.helloWorld}>
        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span className="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p className="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p className="ms-font-l ms-fontColor-white description">{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>

              {
                (() => {
                  if (this.state.results !== null) {
                    return (
                      <ul>
                        {
                          this.state.results.value.map(item => {
                            return <li key={item.Id}>{item.Title}</li>;
                          })
                        }
                      </ul>
                    );
                  }
                })()
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
