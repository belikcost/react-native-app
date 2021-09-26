import React, { useState } from 'react';
import { SectionList, TextInput, StyleSheet, Text, View, StatusBar, Modal, Pressable } from 'react-native';


const App = () => {
    const initialColumns = [
        {
            title: 'Колонка 1',
            data: [
                {
                    title: 'Название',
                    data: 'Text'
                },
                {
                    title: 'Название',
                    data: 'Text'
                }
            ],
        },
        {
            title: 'Колонка 2',
            data: [
                {
                    title: 'Название',
                    data: 'Text'
                },
                {
                    title: 'Название',
                    data: 'Text'
                }
            ],
        }
    ];
    const [columns, setColumns] = useState(initialColumns);
    const [showColumns, setShowColumns] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const initialData = {column: '', title: '', data: ''};
    const [modalData, setModalData] = useState(initialData);

    const addCard = () => {
        const {column, ...data} = modalData;

        setColumns(columns.map(item => item.title === modalData.column ? {
            ...item,
            data: [...item.data, data]
        } : item));

        setShowModal(false);
        setModalData(initialData);
    };

    const onChangeText = (title, index, value) => {
        setColumns(columns.map(column => column.title === title ? {
            ...column,
            data: column.data.map((card, i) => i === index ? {...card, data: value} : card)
        } : column ));
    }

    return (
        <View style={styles.container}>
            {showColumns ? (
                <SectionList
                    sections={columns}
                    keyExtractor={(item, index) => index}
                    renderItem={({section, item, index}) => (
                        <View key={index}>
                            <Text>{item.title}</Text>
                            <TextInput
                                onChangeText={(value) => onChangeText(section.title, index, value)}
                                value={item.data}
                            />
                            {index === section.data.length - 1 && (
                                <Pressable onPress={() => setShowModal(true)}>
                                    <Text style={styles.button}>+</Text>
                                </Pressable>
                            )}
                        </View>
                    )}
                    renderSectionHeader={({section: {title}}) => (
                        <Text style={styles.header}>{title}</Text>
                    )}
                />
            ) : (
                <Pressable onPress={() => setShowColumns(true)}>
                    <View style={styles.menu}>
                        <View style={styles.menuItem}/>
                        <View style={styles.menuItem}/>
                        <View style={styles.menuItem}/>
                    </View>
                </Pressable>
            )}
            <Modal
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.container}>
                    <Text>Колонка</Text>
                    <TextInput
                        onChangeText={(value) => setModalData({...modalData, column: value})}
                        value={modalData.column}
                        placeholder="Название колонки"
                    />
                    <Text>Карточка</Text>
                    <TextInput
                        onChangeText={(value) => setModalData({...modalData, title: value})}
                        value={modalData.title}
                        placeholder="Название карточки"
                    />
                    <Text>Текст</Text>
                    <TextInput
                        onChangeText={(value) => setModalData({...modalData, data: value})}
                        value={modalData.data}
                        placeholder="Текст"
                    />
                    <Pressable onPress={addCard}>
                        <Text style={styles.button}>Ok</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
}

const solidBorder = {
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid'
}

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight + 15,
        display: "flex",
        flexDirection: 'column',
        paddingHorizontal: 15,
    },
    header: {
        fontSize: 25,
        marginTop: 40,
        padding: 5,
        ...solidBorder
    },
    content: {
        padding: 40,
        ...solidBorder
    },
    button: {
        paddingHorizontal: 10,
        alignSelf: 'baseline',
        ...solidBorder,
    },
    menu: {
        width: 20,
        height: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...solidBorder
    },
    menuItem: {
        width: 10,
        height: 1,
        backgroundColor: '#000',
        marginVertical: 1
    }
});

export default App;