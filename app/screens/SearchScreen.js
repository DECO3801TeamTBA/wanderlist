import React, { Component } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ListItem, SearchBar, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { setUser, setToken, setExpiry } from '../actions/user';
import axios from 'axios';
import CONFIG from '../config';

export class SearchScreen extends Component {
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
    //gather all kinds of data from server: Cities, Activities and Destinations 
    this.setState({ loading: true });
    await axios.all([
      axios.get(`${CONFIG.API_URL}activity/`, {
        headers: { Authorization: `Bearer ${this.props.token}` },
      }),
      axios.get(`${CONFIG.API_URL}city/`, {
        headers: { Authorization: `Bearer ${this.props.token}` },
      }),
      axios.get(`${CONFIG.API_URL}destination/`, {
        headers: { Authorization: `Bearer ${this.props.token}` },
      })
    ])
      .then(axios.spread((resActivity, resCity, resDestination) => {
        //gather results
        const activities = resActivity.data
        const destinations = resDestination.data
        const cities = resCity.data
        //transform and combine
        const res = activities.map((a) => {
          return { name: a.name, coverImage: a.coverImage.resourceId, dataType: "Activity", id: a.id }
        })
          .concat(destinations.map((d) => {
            return { name: d.name, coverImage: d.coverImage.resourceId, dataType: "Destination", id: d.id }
          }))
          .concat(cities.map((c) => {
            return { name: c.name, coverImage: c.coverImage.resourceId, dataType: "City", id: c.cityId }
          }))
        this.setResult(res);
      }))
      .catch((res) => {
        console.log(res)
        this.setState({ error: 'Error Loading content', loading: false });
      })
  }

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
    this.setState({ search }, () => {
      if (search === '') {
        this.setState({
          data: [...this.state.temp],
        });
        return;
      }

      this.state.data = this.state.temp
        .filter(function (item) {
          return ((item.name).toUpperCase()).includes(search.toUpperCase());
        })
      //.map(function ({ name }) {
      //  return { name };
      // });
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
        <Animatable.View animation={'fadeInDown'}>
          <FlatList
            ListHeaderComponent={this.renderHeader}
            data={this.state.data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ListItem
                onPress={() => {
                  if (item.dataType == "City") {
                    this.props.navigation.replace('City', {
                      cityId: item.id
                    })
                  } else {
                    this.props.navigation.replace('Content',
                      {
                        contentId: item.id,
                        type: item.dataType
                      })
                  }
                }}>
                <Avatar title={item.name} source={{
                  uri: `${CONFIG.API_URL}resource/${item.coverImage}`,
                  headers: { Authorization: `Bearer ${this.props.token}` }
                }}
                />
                <ListItem.Content>
                  <ListItem.Title>{`${item.name}`}</ListItem.Title>
                  <ListItem.Subtitle>{`${item.dataType}`}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            )}
          />
        </Animatable.View>
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

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    token: state.userReducer.authToken
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    attachUser: (user) => dispatch(setUser(user)),
    attachToken: (authToken) => dispatch(setToken(authToken)),
    attachExpiry: (expiry) => dispatch(setExpiry(expiry)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);