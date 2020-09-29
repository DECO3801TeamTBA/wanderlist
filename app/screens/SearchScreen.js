import React, {Component} from 'react';
import {View, Text, FlatList, Button, StyleSheet} from 'react-native';
import {ListItem, SearchBar} from 'react-native-elements';

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      temp: [],
      error: null,
      search: null,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const url = 'https://jsonplaceholder.typicode.com/users';
    this.setState({loading: true});

    try {
      const response = await fetch(url);
      const json = await response.json();
      this.setResult(json);
    } catch (e) {
      this.setState({error: 'Error Loading content', loading: false});
    }
  };

  setResult = (res) => {
    this.setState({
      data: [...this.state.data, ...res],
      temp: [...this.state.temp, ...res],
      error: res.error || null,
      loading: false,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Search WanderList"
        lightTheme
        round
        editable={true}
        value={this.state.search}
        onChangeText={this.updateSearch}
      />
    );
  };

  updateSearch = (search) => {
    this.setState({search}, () => {
      if (search === '') {
        this.setState({
          data: [...this.state.temp],
        });
        return;
      }

      this.state.data = this.state.temp
        .filter(function (item) {
          return item.name.includes(search);
        })
        .map(function ({name}) {
          return {name};
        });
    });
  };

  render() {
    return this.state.error != null ? (
      <View style={styles.container}>
        <Text>{this.state.error}</Text>
        <Button
          onPress={() => {
            this.getData();
          }}
          title="Reload"
        />
      </View>
    ) : (
      <FlatList
        ListHeaderComponent={this.renderHeader}
        data={this.state.data}
        keyExtractor={(item) => item.name}
        renderItem={({item}) => (
          <ListItem>
            <ListItem.Content>
              <ListItem.Title>{`${item.name}`}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
