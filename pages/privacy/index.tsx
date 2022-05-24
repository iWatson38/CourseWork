import { MainLayoutComponent } from 'components/Layout/MainLayout/MainLayout.component';
import { GetServerSideProps } from 'next';
import { IView } from 'pages';
import React from 'react';
import SCommon from 'styles/Common.module.scss';
import { API } from 'utils/api/api.util';
import SRulesProtectionInformation from './index.module.scss';

const RulesProtectionInformationView: React.FC<IView> = ({ isAuth }) => {
    return (
        <MainLayoutComponent isAuth={isAuth}>
            <main
                className={[
                    SCommon.Container,
                    SRulesProtectionInformation.RulesProtectionInformation,
                ].join(' ')}
            >
                <h1 className={SRulesProtectionInformation.Title}>
                    Правила защиты информации о пользователях сайта shaman.to
                </h1>
                <ul className={SRulesProtectionInformation.MainList}>
                    <li
                        className={
                            SRulesProtectionInformation.StandartListElement
                        }
                    >
                        1. Общие положения
                        <ul className={SRulesProtectionInformation.ChildList}>
                            <li
                                className={
                                    SRulesProtectionInformation.StandartListElement
                                }
                            >
                                1.1. Настоящие Правила являются официальным
                                документом ИП ВЕПРЕНЦЕВ СЕРГЕЙ СЕРГЕЕВИЧ,
                                расположенного по адресу 630008, г.Новосибирск.
                                Ул. Лескова д. 25, кВ. 175 (далее –
                                Администрация Сайта), и определяют порядок
                                обработки и защиты информации о физических
                                лицах, пользующихся услугами интернет-сайта{' '}
                                <a
                                    className={SRulesProtectionInformation.Link}
                                    href="https://vk.com/shamanto"
                                >
                                    http://shaman.to/
                                </a>{' '}
                                (далее – Сайт) и его сервисов (далее –
                                Пользователи).
                            </li>
                            <li
                                className={
                                    SRulesProtectionInformation.StandartListElement
                                }
                            >
                                1.2. Целью настоящих Правил является обеспечение
                                надлежащей защиты информации о пользователях, в
                                том числе их персональных данных, от
                                несанкционированного доступа и разглашения.
                            </li>
                            <li
                                className={
                                    SRulesProtectionInformation.StandartListElement
                                }
                            >
                                1.3. Отношения, связанные со сбором, хранением,
                                распространением и защитой информации о
                                пользователях Сайта, регулируются настоящими
                                Правилами, иными официальными документами
                                Администрации Сайта и действующим
                                законодательством Российской Федерации.
                            </li>
                            <li
                                className={
                                    SRulesProtectionInformation.StandartListElement
                                }
                            >
                                1.4. Действующая редакция Правил, являющихся
                                публичным документом, доступна любому
                                пользователю сети Интернет при переходе по
                                ссылке{' '}
                                <a
                                    className={SRulesProtectionInformation.Link}
                                    href="http://shaman.to/privacy"
                                >
                                    http://shaman.to/privacy
                                </a>
                                . Администрация Сайта вправе вносить изменения в
                                настоящие Правила. При внесении изменений в
                                Правила Администрация Сайта уведомляет об этом
                                пользователей путем размещения новой редакции
                                Правил на Сайте по постоянному адресу{' '}
                                <a
                                    className={SRulesProtectionInformation.Link}
                                    href="http://shaman.to/privacy"
                                >
                                    http://shaman.to/privacy
                                </a>{' '}
                                не позднее, чем за 10 дней до вступления в силу
                                соответствующих изменений. Предыдущие редакции
                                Правил хранятся в архиве документации
                                Администрации Сайта.
                            </li>
                            <li
                                className={
                                    SRulesProtectionInformation.StandartListElement
                                }
                            >
                                1.5. Настоящие Правила разработаны и
                                используются в соответствии с Правилами
                                пользования сайтом shaman.to, размещенными на
                                Сайте по адресу{' '}
                                <a
                                    className={SRulesProtectionInformation.Link}
                                    href="http://shaman.to/terms"
                                >
                                    http://shaman.to/terms
                                </a>
                                . В случае наличия противоречий между настоящими
                                Правилами и иными официальными документами
                                Администрации Сайта применению подлежат
                                настоящие Правила.
                            </li>
                            <li
                                className={
                                    SRulesProtectionInformation.StandartListElement
                                }
                            >
                                1.6. Регистрируясь и используя Сайт,
                                Пользователь выражает свое согласие с условиями
                                настоящих Правил.
                            </li>
                            <li
                                className={
                                    SRulesProtectionInformation.StandartListElement
                                }
                            >
                                1.7. В случае несогласия Пользователя с
                                условиями настоящих Правил использование Сайта и
                                его сервисов должно быть немедленно прекращено.
                            </li>
                        </ul>
                    </li>
                    <li
                        className={
                            SRulesProtectionInformation.StandartListElement
                        }
                    >
                        2. Условия пользования Сайтом
                        <ul className={SRulesProtectionInformation.ChildList}>
                            <li
                                className={
                                    SRulesProtectionInformation.StandartListElement
                                }
                            >
                                2.1. Оказывая услуги по использованию Сайта и
                                его сервисов (далее – Услуги Сайта),
                                Администрация Сайта, действуя разумно и
                                добросовестно, считает, что Пользователь:
                                <ul
                                    className={
                                        SRulesProtectionInformation.PointList
                                    }
                                >
                                    <li
                                        className={
                                            SRulesProtectionInformation.PointListElement
                                        }
                                    >
                                        обладает всеми необходимыми правами,
                                        позволяющими ему осуществлять
                                        регистрацию и использовать настоящий
                                        Сайт;
                                    </li>
                                    <li
                                        className={
                                            SRulesProtectionInformation.PointListElement
                                        }
                                    >
                                        указывает достоверную информацию о себе
                                        в объемах, необходимых для пользования
                                        Услугами Сайта;
                                    </li>
                                    <li
                                        className={
                                            SRulesProtectionInformation.PointListElement
                                        }
                                    >
                                        осознает, что информация на Сайте,
                                        размещаемая Пользователем о себе, может
                                        становиться доступной для других
                                        Пользователей Сайта и пользователей
                                        Интернета, может быть скопирована и
                                        распространена такими пользователями;
                                    </li>
                                    <li
                                        className={
                                            SRulesProtectionInformation.PointListElement
                                        }
                                    >
                                        осознает, что некоторые виды информации,
                                        переданные им другим Пользователям, не
                                        могут быть удалены самим Пользователем;
                                    </li>
                                    <li
                                        className={
                                            SRulesProtectionInformation.PointListElement
                                        }
                                    >
                                        ознакомлен с настоящими Правилами,
                                        выражает свое согласие с ними и
                                        принимает на себя указанные в них права
                                        и обязанности.
                                    </li>
                                </ul>
                            </li>
                            <li
                                className={
                                    SRulesProtectionInformation.StandartListElement
                                }
                            >
                                2.2. Администрация Сайта не проверяет
                                достоверность получаемой (собираемой) информации
                                о пользователях, за исключением случаев, когда
                                такая проверка необходима в целях исполнения
                                Администрацией Сайта обязательств перед
                                пользователем.
                            </li>
                        </ul>
                    </li>
                    <li
                        className={
                            SRulesProtectionInformation.StandartListElement
                        }
                    >
                        3. Цели обработки информации
                        <p
                            className={
                                SRulesProtectionInformation.LonelyElement
                            }
                        >
                            Администрация Сайта осуществляет обработку
                            информации о Пользователях, в том числе их
                            персональных данных, в целях выполнения обязательств
                            Администрации Сайта перед Пользователями в отношении
                            использования Сайта и его сервисов.
                        </p>
                    </li>
                    <li
                        className={
                            SRulesProtectionInformation.StandartListElement
                        }
                    >
                        4. Состав информации о пользователях
                        <ul className={SRulesProtectionInformation.ChildList}>
                            <li
                                className={
                                    SRulesProtectionInformation.StandartListElement
                                }
                            >
                                4.1. Персональные данные Пользователей
                                <p
                                    className={
                                        SRulesProtectionInformation.SubtitleList
                                    }
                                >
                                    Персональные данные Пользователей включают в
                                    себя:
                                </p>
                                <ul
                                    className={
                                        SRulesProtectionInformation.ChildList
                                    }
                                >
                                    <li
                                        className={
                                            SRulesProtectionInformation.ExtraPaddingListElement
                                        }
                                    >
                                        4.1.1. предоставляемые Пользователями и
                                        минимально необходимые для регистрации
                                        на Сайте: зарегистрированный аккаунт на
                                        интернет-ресурсе vk.com;
                                    </li>
                                </ul>
                            </li>
                            <li
                                className={
                                    SRulesProtectionInformation.StandartListElement
                                }
                            >
                                4.2. Иная информация о Пользователях,
                                обрабатываемая Администрацией Сайта
                                Администрация Сайта может также обрабатывать
                                иную информацию о Пользователях, которая
                                включает в себя:
                                <ul
                                    className={
                                        SRulesProtectionInformation.ChildList
                                    }
                                >
                                    <li
                                        className={
                                            SRulesProtectionInformation.StandartListElement
                                        }
                                    >
                                        4.2.1. дополнительные данные, получаемые
                                        при доступе к Сайту, включающие в себя
                                        данные о технических средствах
                                        (устройствах), технологическом
                                        взаимодействии с Сайтом (в т.ч. IP-адрес
                                        хоста, вид операционной системы
                                        пользователя, тип браузера,
                                        географическое положение, поставщик
                                        услуг Интернета, данные из адресной
                                        книги), и последующих действиях
                                        Пользователя на Сайте.
                                    </li>
                                    <li
                                        className={
                                            SRulesProtectionInformation.StandartListElement
                                        }
                                    >
                                        4.2.2. информация, автоматически
                                        получаемая при доступе к Сайту с
                                        использованием закладок (cookies);
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li
                        className={
                            SRulesProtectionInformation.StandartListElement
                        }
                    >
                        5. Обработка информации о пользователях
                        <ul className={SRulesProtectionInformation.ChildList}>
                            <li
                                className={
                                    SRulesProtectionInformation.StandartListElement
                                }
                            >
                                5.1. Обработка персональных данных
                                осуществляется на основе принципов:
                                <ul
                                    className={
                                        SRulesProtectionInformation.ChildList
                                    }
                                >
                                    <li
                                        className={
                                            SRulesProtectionInformation.LetterListElement
                                        }
                                    >
                                        а) законности целей и способов обработки
                                        персональных данных;
                                    </li>
                                    <li
                                        className={
                                            SRulesProtectionInformation.LetterListElement
                                        }
                                    >
                                        б) добросовестности;
                                    </li>
                                    <li
                                        className={
                                            SRulesProtectionInformation.LetterListElement
                                        }
                                    >
                                        в) соответствия целей обработки
                                        персональных данных целям, заранее
                                        определенным и заявленным при сборе
                                        персональных данных, а также полномочиям
                                        Администрации Сайта;
                                    </li>
                                    <li
                                        className={
                                            SRulesProtectionInformation.LetterListElement
                                        }
                                    >
                                        г) соответствия объема и характера
                                        обрабатываемых персональных данных,
                                        способов обработки персональных данных
                                        целям обработки персональных данных;
                                    </li>
                                </ul>
                                <ul
                                    className={
                                        SRulesProtectionInformation.ChildList
                                    }
                                >
                                    <li
                                        className={
                                            SRulesProtectionInformation.StandartListElement
                                        }
                                    >
                                        5.1.1. Условия и цели обработки
                                        персональных данных
                                        <p
                                            className={
                                                SRulesProtectionInformation.SimpleText
                                            }
                                        >
                                            Администрация Сайта осуществляет
                                            обработку персональных данных
                                            пользователя в целях исполнения
                                            договора между Администрацией Сайта
                                            и Пользователем на оказание Услуг
                                            Сайта (п. 2.2 Правил пользования
                                            Сайтом shaman.to{' '}
                                            <a
                                                className={
                                                    SRulesProtectionInformation.Link
                                                }
                                                href="http://shaman.to/terms"
                                            >
                                                http://shaman.to/terms
                                            </a>
                                            ). В силу статьи 6 Федерального
                                            закона от 27.07.2006 № 152-ФЗ «О
                                            персональных данных» отдельное
                                            согласие пользователя на обработку
                                            его персональных данных не
                                            требуется. В силу п.п. 2 п. 2 статьи
                                            22 указанного закона Администрация
                                            Сайта вправе осуществлять обработку
                                            персональных данных без уведомления
                                            уполномоченного органа по защите
                                            прав субъектов персональных данных.
                                        </p>
                                    </li>
                                    <li
                                        className={
                                            SRulesProtectionInformation.StandartListElement
                                        }
                                    >
                                        5.1.2. Сбор персональных данных
                                        <p
                                            className={
                                                SRulesProtectionInformation.SimpleText
                                            }
                                        >
                                            Сбор персональных данных
                                            Пользователя осуществляется на Сайте
                                            при регистрации и авторизации.
                                        </p>
                                        <p
                                            className={
                                                SRulesProtectionInformation.LonelyElement
                                            }
                                        >
                                            Персональные данные, предусмотренные
                                            п. 4.1.1. настоящих Правил,
                                            предоставляются Пользователем и
                                            являются минимально необходимыми при
                                            регистрации.
                                        </p>
                                    </li>
                                    <li
                                        className={
                                            SRulesProtectionInformation.StandartListElement
                                        }
                                    >
                                        5.1.3. Хранение и использование
                                        персональных данных
                                        <p
                                            className={
                                                SRulesProtectionInformation.SimpleText
                                            }
                                        >
                                            Персональные данные пользователей
                                            хранятся исключительно на
                                            электронных носителях и
                                            обрабатываются с использованием
                                            автоматизированных систем, за
                                            исключением случаев, когда
                                            неавтоматизированная обработка
                                            персональных данных необходима в
                                            связи с исполнением требований
                                            законодательства.
                                        </p>
                                    </li>
                                    <li
                                        className={
                                            SRulesProtectionInformation.StandartListElement
                                        }
                                    >
                                        5.1.4. Передача персональных данных
                                        <p
                                            className={
                                                SRulesProtectionInformation.SimpleText
                                            }
                                        >
                                            Персональные данные Пользователей не
                                            передаются никаким другим третьим
                                            лицам, за исключением случаев, прямо
                                            предусмотренных настоящими
                                            Правилами. При указании Пользователя
                                            или при наличии согласия
                                            Пользователя возможна передача
                                            персональных данных Пользователя
                                            третьим лицам — контрагентам
                                            Администрации Сайта с условием
                                            принятия такими контрагентами
                                            обязательств по обеспечению
                                            конфиденциальности полученной
                                            информации. Предоставление
                                            персональных данных Пользователей по
                                            запросу государственных органов
                                            (органов местного самоуправления)
                                            осуществляется в порядке,
                                            предусмотренном законодательством. В
                                            целях исполнения соглашения между
                                            Пользователем и Администрацией Сайта
                                            и предоставления Пользователю
                                            доступа к использованию
                                            функциональности Сайта Администрация
                                            Сайта развивает предоставляемые
                                            сервисы и продукты, разрабатывает и
                                            внедряет новые сервисы и продукты,
                                            оптимизирует качество сервисов и
                                            продуктов, совершенствует доступную
                                            функциональность Сайта и сервисов.
                                            Для обеспечения реализации указанных
                                            целей Пользователь соглашается на
                                            осуществление Администрацией Сайта с
                                            соблюдением применимого
                                            законодательства сервисных рассылок
                                            в его адрес (в том числе опросов) с
                                            целью получения обратной связи
                                            посредством сервисов Администрации
                                            Сайта и/или сервисов третьих лиц:
                                            электронных сообщений, SMS и иных
                                            видов рассылок, — а также сбора,
                                            хранения, накопления,
                                            систематизации, извлечения,
                                            сопоставления, использования,
                                            наполнения (уточнения) их данных, а
                                            также на получение и передачу
                                            аффилированным лицам и партнёрам
                                            результатов автоматизированной
                                            обработки таких данных с применением
                                            различных моделей оценки информации
                                            в виде целочисленных и/или текстовых
                                            значений и идентификаторов,
                                            соответствующих заданным в запросах
                                            оценочным критериям, для обработки
                                            данных Администрацией Сайта и/или
                                            лицами, указанными в настоящем
                                            пункте.
                                        </p>
                                    </li>
                                    <li
                                        className={
                                            SRulesProtectionInformation.StandartListElement
                                        }
                                    >
                                        5.1.5. Уничтожение персональных данных
                                        <p
                                            className={
                                                SRulesProtectionInformation.SimpleText
                                            }
                                        >
                                            Персональные данные пользователя
                                            уничтожаются при:
                                        </p>
                                        <p
                                            className={
                                                SRulesProtectionInformation.SimpleText
                                            }
                                        >
                                            – удалении Администрацией Сайта
                                            информации, размещаемой
                                            Пользователем, а также персональной
                                            страницы Пользователя в случаях,
                                            установленных Правилами пользования
                                            сайтом VK.com{' '}
                                            <a
                                                className={
                                                    SRulesProtectionInformation.Link
                                                }
                                                href="http://shaman.to/terms"
                                            >
                                                http://shaman.to/terms
                                            </a>{' '}
                                            ( п.п. 7.2.2. и 8.4.). В случае
                                            удаления аккаунта Администрация
                                            Сайта хранит на своих электронных
                                            носителях персональные и иные
                                            необходимые данные Пользователя в
                                            течение необходимого и
                                            установленного действующим
                                            законодательством Российской
                                            Федерации срока.
                                        </p>
                                    </li>
                                </ul>
                            </li>
                            <li
                                className={
                                    SRulesProtectionInformation.StandartListElement
                                }
                            >
                                5.2. Передавая информацию при авторизации и
                                регистрации, в том том числе персональные
                                данные, Пользователь осознает и соглашается с
                                тем, что указанная информация может быть
                                доступна другим пользователям сети Интернет с
                                учетом особенностей архитектуры и функционала
                                Сайта.
                            </li>
                        </ul>
                    </li>
                    <li
                        className={
                            SRulesProtectionInformation.StandartListElement
                        }
                    >
                        6. Права и обязанности пользователей
                        <ul className={SRulesProtectionInformation.ChildList}>
                            <li
                                className={
                                    SRulesProtectionInformation.StandartListElement
                                }
                            >
                                6.1. Пользователи вправе:
                                <ul
                                    className={
                                        SRulesProtectionInformation.ChildList
                                    }
                                >
                                    <li
                                        className={
                                            SRulesProtectionInformation.StandartListElement
                                        }
                                    >
                                        6.1.1. требовать от Администрации Сайта
                                        уточнения своих персональных данных, их
                                        блокирования или уничтожения в случае,
                                        если такие данные являются неполными,
                                        устаревшими, недостоверными, незаконно
                                        полученными или не являются необходимыми
                                        для заявленной цели обработки;
                                    </li>
                                    <li
                                        className={
                                            SRulesProtectionInformation.StandartListElement
                                        }
                                    >
                                        6.1.2. на основании запроса получать от
                                        Администрации Сайта информацию,
                                        касающуюся обработки его персональных
                                        данных.
                                    </li>
                                </ul>
                            </li>
                            <li
                                className={
                                    SRulesProtectionInformation.StandartListElement
                                }
                            >
                                6.2. Следующая информация о зарегистрированном
                                Пользователе всегда доступна любому
                                зарегистрированному Пользователю Сайта
                                <ul
                                    className={
                                        SRulesProtectionInformation.ChildList
                                    }
                                >
                                    <li
                                        className={
                                            SRulesProtectionInformation.StandartListElement
                                        }
                                    >
                                        6.2.1. фамилия и имя Пользователя;
                                    </li>
                                    <li
                                        className={
                                            SRulesProtectionInformation.LetterListElement
                                        }
                                    >
                                        6.2.2. дата рождения, профильная
                                        фотография;
                                    </li>
                                    <li
                                        className={
                                            SRulesProtectionInformation.LetterListElement
                                        }
                                    >
                                        6.2.3. список друзей пользователя.
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li
                        className={
                            SRulesProtectionInformation.StandartListElement
                        }
                    >
                        7. Меры по защите информации о Пользователях
                        <ul className={SRulesProtectionInformation.ChildList}>
                            <li
                                className={
                                    SRulesProtectionInformation.StandartListElement
                                }
                            >
                                7.1. Администрация Сайта принимает технические и
                                организационно-правовые меры в целях обеспечения
                                защиты персональных данных Пользователя от
                                неправомерного или случайного доступа к ним,
                                уничтожения, изменения, блокирования,
                                копирования, распространения, а также от иных
                                неправомерных действий.
                            </li>
                        </ul>
                    </li>
                    <li
                        className={
                            SRulesProtectionInformation.StandartListElement
                        }
                    >
                        8. Ограничение действия Правил
                        <ul className={SRulesProtectionInformation.ChildList}>
                            <li
                                className={
                                    SRulesProtectionInformation.StandartListElement
                                }
                            >
                                Действие настоящих Правил не распространяется на
                                действия и интернет-ресурсы третьих лиц.
                            </li>
                            <li
                                className={
                                    SRulesProtectionInformation.StandartListElement
                                }
                            >
                                Администрация Сайта не несет ответственности за
                                действия третьих лиц, получивших в результате
                                использования Интернета или Услуг Сайта доступ к
                                информации о Пользователе, за последствия
                                использования информации, которая, в силу
                                природы Сайта, доступна любому пользователю сети
                                Интернет.
                            </li>
                        </ul>
                    </li>
                    <li
                        className={
                            SRulesProtectionInformation.StandartListElement
                        }
                    >
                        9. Обращения пользователей
                        <ul className={SRulesProtectionInformation.ChildList}>
                            <li
                                className={
                                    SRulesProtectionInformation.StandartListElement
                                }
                            >
                                9.1. Пользователи вправе направлять
                                Администрации Сайта свои запросы, в том числе
                                запросы относительно использования их
                                персональных данных, предусмотренные п. 6.1.2
                                настоящих Правил, в письменной форме по адресу:
                                Россия, 630008, г.Новосибирск. Ул. Лескова д.
                                25, кВ. 175 или в форме электронного документа,
                                подписанного квалифицированной электронной
                                подписью в соответствии с законодательством
                                Российской Федерации, по адресу электронной
                                почты:{' '}
                                <a
                                    href="mailto:info@shaman.to"
                                    className={SRulesProtectionInformation.Link}
                                    rel="noreferrer"
                                >
                                    info@shaman.to.
                                </a>
                            </li>
                            <li
                                className={
                                    SRulesProtectionInformation.StandartListElement
                                }
                            >
                                9.2. Запрос, направляемый пользователем, должен
                                содержать следующую информацию:
                                <ul
                                    className={
                                        SRulesProtectionInformation.PointList
                                    }
                                >
                                    <li
                                        className={
                                            SRulesProtectionInformation.PointListElement
                                        }
                                    >
                                        номер основного документа,
                                        удостоверяющего личность пользователя
                                        или его представителя;
                                    </li>
                                    <li
                                        className={
                                            SRulesProtectionInformation.PointListElement
                                        }
                                    >
                                        сведения о дате выдачи указанного
                                        документа и выдавшем его органе;
                                    </li>
                                    <li
                                        className={
                                            SRulesProtectionInformation.PointListElement
                                        }
                                    >
                                        сведения, подтверждающие участие
                                        пользователя в отношениях с оператором
                                        (в частности, порядковый номер id
                                        пользователя или короткое (поддоменное)
                                        имя, заменяющее порядковый номер id);
                                    </li>
                                    <li
                                        className={
                                            SRulesProtectionInformation.PointListElement
                                        }
                                    >
                                        подпись пользователя или его
                                        представителя.
                                    </li>
                                </ul>
                            </li>
                            <li
                                className={
                                    SRulesProtectionInformation.StandartListElement
                                }
                            >
                                9.3. Администрация Сайта обязуется рассмотреть и
                                направить ответ на поступивший запрос
                                пользователя в течение 30 дней с момента
                                поступления обращения.
                            </li>
                            <li
                                className={
                                    SRulesProtectionInformation.StandartListElement
                                }
                            >
                                9.4. Вся корреспонденция, полученная
                                Администрацией Сайта от пользователей (обращения
                                в письменной или электронной форме), относится к
                                информации ограниченного доступа и не
                                разглашается без письменного согласия
                                Пользователя. Персональные данные и иная
                                информация о Пользователе, направившем запрос,
                                не могут быть без специального согласия
                                Пользователя использованы иначе, как для ответа
                                по теме полученного запроса или в случаях, прямо
                                предусмотренных законодательством.
                            </li>
                        </ul>
                    </li>
                </ul>
            </main>
        </MainLayoutComponent>
    );
};

export default RulesProtectionInformationView;

export const getServerSideProps: GetServerSideProps = async (
    context,
): Promise<{
    props: {
        isAuth: boolean;
    };
}> => {
    if (context.req.cookies.access_token) {
        API.defaults.headers.common[
            'Authorization'
        ] = `Bearer ${context.req.cookies.access_token}`;
    }
    return {
        props: {
            isAuth: !!context.req.cookies.access_token,
        },
    };
};
