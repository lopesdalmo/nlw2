import React, {useState, FormEvent} from 'react';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import api from '../../services/api';
import {useHistory} from 'react-router-dom';

import './styles.css';

function TeacherForm() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const defaultScheduleItem = {week_day: 0, from: '0:00 AM', to: '0:00 AM'};

  const [scheduleItems, setScheduleItems] = useState([defaultScheduleItem]);

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, defaultScheduleItem]);
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const newScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return {...scheduleItem, [field]: value};
      }

      return scheduleItem;
    });

    setScheduleItems(newScheduleItems);
  }

  function createClass(e: FormEvent) {
    e.preventDefault();

    api
      .post('classes', {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      })
      .then(() => {
        alert('Cadastro realizado com sucesso!');
        history.push('/');
      })
      .catch(() => {
        console.log('Erro ao efetuar cadastro...');
      });
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="Oprimeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={createClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input name="name" label="Nome completo" onChange={(e) => setName(e.target.value)} />

            <Input name="avatar" label="Avatar" onChange={(e) => setAvatar(e.target.value)} />
            <Input name="whatsapp" label="WhatsApp" onChange={(e) => setWhatsapp(e.target.value)} />

            <Textarea name="bio" label="Biografia" onChange={(e) => setBio(e.target.value)} />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
              onChange={(e) => setSubject(e.target.value)}
              options={[
                {value: 'Artes', label: 'Artes'},
                {value: 'Português', label: 'Português'},
                {value: 'Matemática', label: 'Matemática'},
                {value: 'Física', label: 'Física'},
                {value: 'Química', label: 'Química'},
                {value: 'História', label: 'História'},
                {value: 'Geografia', label: 'Geografia'},
                {value: 'Educação física', label: 'Educação física'},
                {value: 'Biologia', label: 'Biologia'},
              ]}
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              onChange={(e) => setCost(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, pos) => {
              return (
                <div className="schedule-item" key={pos}>
                  <Select
                    name="week-day"
                    label="Dia da semana"
                    onChange={(e) => setScheduleItemValue(pos, 'week_day', e.target.value)}
                    options={[
                      {value: '0', label: 'Domingo'},
                      {value: '1', label: 'Segunda-feira'},
                      {value: '2', label: 'Terça-feira'},
                      {value: '3', label: 'Quarta-feira'},
                      {value: '4', label: 'Quinta-feira'},
                      {value: '5', label: 'Sexta-feira'},
                      {value: '6', label: 'Sábado'},
                    ]}
                  />

                  <Input
                    name="from"
                    label="Das"
                    type="time"
                    onChange={(e) => setScheduleItemValue(pos, 'from', e.target.value)}
                  />

                  <Input
                    name="to"
                    label="Até"
                    type="time"
                    onChange={(e) => setScheduleItemValue(pos, 'to', e.target.value)}
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencher todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
